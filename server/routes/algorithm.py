from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS
import psycopg2
import pandas as pd
import networkx as nx
import ast 
import itertools
from collections import Counter
from datetime import datetime

algorithm = Blueprint('algorithm', __name__, template_folder='templates')
CORS(algorithm)

# Connect to your postgres DB
conn = psycopg2.connect("dbname=slcapplication user=postgres")

def postgresql_to_dataframe(conn, select_query, column_names):
    """
    Tranform a SELECT query into a pandas dataframe
    """
    cursor = conn.cursor()
    try:
        cursor.execute(select_query)
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        cursor.close()
        return 1
    
    # Naturally we get a list of tupples
    tupples = cursor.fetchall()
    cursor.close()
    
    # We just need to turn it into a pandas dataframe
    df = pd.DataFrame(tupples, columns=column_names)
    return df

# Used to turn comma seperated list into a set
def comma_parser(cslist):
    if cslist == "":
        return set()
    cslist = cslist.title()
    return set(cslist.split(", "))

# When adding to dictionary, make sure key and value are in title case
common_errors = {"Eecs": "Computer Science",
                 "Cs": "Computer Science",
                 "Stats": "Statistics",
                 "Psych": "Psychology",
                 "Phil": "Philosophy ",
                 "Econ": "Economics",
                 "Mcb": "Molecular and Cell Biology",
                 "Math": "Mathematics",
                 "Cheme": "Chemical Engineering",
                 "Ds": "Data Science",
                 "Polisci": "Political Science",
                 "Meche": "Mechanical Engineering",
                 "Comp.lit.": "Comparative Literature",
                 "Complit": "Comparative Literature",
                 "App Math": "Applied Mathematics"}
# Guards against common ways to write major differently
def error_major_fixer(major_set):
    updated_set = []
    for i in major_set:
        if i in common_errors:
            updated_set.append(common_errors[i])
        else:
            updated_set.append(i)
    if (len(updated_set) == 0):
        return set(["No Response"])
    return set(updated_set)

@algorithm.route('/algorithm')
def run_algorithm():
    column_names = ["First", "Last", "Email", "SID", "Academic Title", "Residency", "Major", "Gender", "Gender Custom", "Availability", "Hope To Gain", "Plan to Meet", "F_C_Learn", 
    "F_C_Learn_Other", "F_C_Learn_Level", "S_C_Learn", "S_C_Learn_Other", "S_C_Learn_Level", "F_C_Teach", "F_C_Teach_Other", "F_C_Teach_Level", "S_C_Teach", "S_C_Teach_Other",
    "S_C_Teach_Level", "Comments", "P_Major", "P_Major_Weight", "P_Gender", "P_Gender_Custom", "P_Gender_Weight", "Waiver Accept", "Timestamp"]
    df = postgresql_to_dataframe(conn, "select * from intakeform", column_names)
    # TODO Have to remove people from if already paired and maybe duplicate applicants (Step 1)
    # Step 2 of algorithm
    formatted_data = []
    for index, row in df.iterrows():
        comments = row["Comments"]
        teach_dict = {}
        try:
            teach1 = row["F_C_Teach"]
            if row["F_C_Teach"] == "Other" or row["F_C_Teach"] == "":
                teach1 = row["F_C_Teach_Other"].title()
            teach1_level = row["F_C_Teach_Level"]
            if teach1 != "":
                teach_dict[teach1] = teach1_level
        except:
            pass
        try:
            teach2 = row["S_C_Teach"]
            if row["S_C_Teach"] == "Other" or row["S_C_Teach"] == "":
                teach2 = row["S_C_Teach_Other"].title()
            teach2_level = row["S_C_Teach_Level"]
            if teach2 != "":
                teach_dict[teach2] = teach2_level
        except:
            pass
        learn_dict = {}
        try:
            learn1 = row["F_C_Learn"]
            if row["F_C_Learn"] == "Other" or row["F_C_Learn"] == "":
                learn1 = row["F_C_Learn_Other"].title()
            learn1_level = row["F_C_Learn_Level"]
            if learn1 != "":
                learn_dict[learn1] = learn1_level
        except:
            pass
        try:
            learn2 = row["S_C_Learn"]
            if row["S_C_Learn"] == "Other" or row["S_C_Learn"] == "":
                learn2 = row["S_C_Learn_Other"].title()
            learn2_level = row["S_C_Learn_Level"]
            if learn2 != "":
                learn_dict[learn2] = learn2_level
        except:
            pass
        try:
            d_o_w_set = set(row["Availability"])
        except:
            pass
        try:
            row["Major"] = error_major_fixer(comma_parser(row["Major"]))
            if row["Gender"] == "Custom" or row["Gender"] == "":
                row["Gender"] = row["Gender Custom"].title().strip()
        except:
            pass
        try:
            if row["P_Major"] == "" or row["P_Major_Weight"] == "":
                row["P_Major_Weight"] = 0
            row["P_Major"] = error_major_fixer(comma_parser(row["P_Major"]))
        except:
            pass
        try:
            if row["P_Gender"] == "Custom" or row["P_Gender"] == "":
                row["P_Gender"] = row["P_Gender_Custom"].title().strip()
            if row["P_Gender"] == "" or row["P_Gender_Weight"] == "":
                row["P_Gender_Weight"] = 0
        except:
            pass
        formatted_data.append({"Timestamp": row["Timestamp"].to_pydatetime().strftime('%Y-%m-%d %H:%M:%S'), "First":row["First"], "Last":row["Last"], "Email":row["Email"], "SID":row["SID"], "Level": row["Academic Title"], 
        "Gender": row["Gender"].strip(), "Major":row["Major"], "Teach":teach_dict, "Learn":learn_dict, "Comments":comments, "Days Available": d_o_w_set, "Partner Major": row["P_Major"], 
        "Partner Major Weight": row["P_Major_Weight"], "Partner Gender": row["P_Gender"].strip(), "Partner Gender Weight": row["P_Gender_Weight"]})
    step_2 = pd.DataFrame(formatted_data, columns=["Timestamp", "First", "Last", "Email", "SID", "Level", "Gender", "Major", "Teach", "Learn", "Comments", "Days Available", 
    "Partner Major", "Partner Major Weight", "Partner Gender", "Partner Gender Weight"])
    step_3(step_2)     
    return "Complete"

# Step 3 of the algorithm 
def step_3(app_df):
    # First cell block
    people = [0] #people is 1-indexed
    n = len(app_df)
    criteria = 2
    for index, row in app_df.iterrows():
        timestamp = row['Timestamp']

        # Assigning dict with language and level
        teach_dict = row["Teach"]
        learn_dict = row["Learn"]
        # Assigning list with languages only
        teach_langs = list(teach_dict.keys())
        learn_langs = list(learn_dict.keys())

        # Assinging variables to teaching and learning languages
        teach1 = teach_langs[0]
        teach1_lvl = teach_dict[teach1]
        if len(teach_langs) == 2:
            teach2 = teach_langs[1]
            teach2_lvl = teach_dict[teach2]
        else:
            teach2 = ""
            teach2_lvl = ""

        learn1 = learn_langs[0]
        learn1_lvl = learn_dict[learn1]
        if len(learn_langs) == 2:
            learn2 = learn_langs[1]
            learn2_lvl = learn_dict[learn2]
        else:
            learn2 = ""
            learn2_lvl = ""

        # New changes regarding major, days of week, hobbies, and gender below --> following convention of using app_df.iloc (seems redunant imo)
        name = row['First']
        gender = row['Gender']
        partnerGender = row["Partner Gender"]
        partnerGenderWeight = row["Partner Gender Weight"]
        major = row['Major']
        partnerMajor = row["Partner Major"]
        partnerMajorWeight = row["Partner Major Weight"]
        days_of_week_dict = row["Days Available"]

        # New person with the specifications mentioned above
        person = Person(index+1, name, timestamp, learn1, learn1_lvl, learn2, learn2_lvl, teach1, teach1_lvl, teach2, teach2_lvl, gender, partnerGender, partnerGenderWeight, major, partnerMajor, partnerMajorWeight, days_of_week_dict)
        people.append(person)

    # Making the timestamp time relative to the timestamp of the person with the max_time, still not sure why
    max_time = max([person.timestamp for person in people[1:]])
    for person in people[1:]:
        person.timestamp = max_time - person.timestamp
        print(person.profile)
    #Second cell block
    #maximal matching networkx
    G = nx.Graph()

    #build compatability graph
    for i in range(1, n+1): #teachers
        for j in range(i, n+1): #students
            if people[i].can_teach(people[j]) and people[j].can_teach(people[i]):
                # It seems like the edge weights of the graph depends on when the students went for orientation
                print("Possible Pair:")
                print("Names: ",people[i].name, ",", people[j].name)
                G.add_edge(i, j, weight = pair_find_weight(people[i], people[j]))
                print()

    # pairs_idx = nx.maximal_matching(G) #performs maximal matching on people index graph to produce pair indices
    # pairs_idx holds a dictionary of matchings
    # A matching is a subset of edges in which a node doesnt occur more thn once. Therefore this algorithm matches matchable people together
    pairs_idx = nx.algorithms.matching.max_weight_matching(G, maxcardinality=True)
    pairs_idx = [sorted([key, value]) for key, value in pairs_idx]
    # Not required?
    pairs_idx.sort()
    # Groupby should take in a function based on which is groups the iterable argument. However here only iterable is given
    pairs_idx = list(pairs_idx for pairs_idx,_ in itertools.groupby(pairs_idx))
    # print(pairs_idx)

    print("maximal matching produced {} pairs out of {} people".format(len(pairs_idx), n))

    pairs = [] #pairs is a list of Pair objects.
    paired_idx_set = set() #used to keep track of who is already paired, in order to identify unpaired people
    for pair_idx in pairs_idx:
        p1_idx = pair_idx[0]
        p2_idx = pair_idx[1]
        paired_idx_set.add(p1_idx)
        paired_idx_set.add(p2_idx)
        pair = Pair(people[p1_idx], people[p2_idx])
        pairs.append(pair)

    singles_idx = []
    for i in range(1, n+1):
        if i not in paired_idx_set:
            singles_idx.append(i)

    print("{} people still remain unpaired".format(len(singles_idx)))
    #make new graph, consisting on each existing pair as a node, and each unpaired_person as a node.
    #edges are between each unpaired_person and compatible pairs.
    #perform a second round of maximal matching to get trios.

    G2 = nx.Graph()

    #build compatability graph between pairs and unpaired people
    for i in range(len(pairs)):
        for j in range(len(pairs), len(pairs)+len(singles_idx)): #singles node indices are incremented to avoid collisions
            if pairs[i].can_form_trio(people[singles_idx[j-len(pairs)]], criteria):
                print("Possible Trio Below")
                print(pairs[i].p1.name,",", pairs[i].p2.name,",", people[singles_idx[j-len(pairs)]].name)
                G2.add_edge(i, j, weight=trio_find_weight(pairs[i], people[singles_idx[j-len(pairs)]]))
                print()

    #second round of maximal matching
    trios_idx = nx.algorithms.matching.max_weight_matching(G2, maxcardinality=True)
    trios_idx = [sorted([key, value]) for key, value in trios_idx]
    trios_idx.sort()
    trios_idx = list(k for k,_ in itertools.groupby(trios_idx))

    pairs_idx_used = []
    for trio_idx in trios_idx:
        pairs_idx_used.append(trio_idx[0])

    reduced_pairs = list(pairs)
    for pair_idx_used in sorted(pairs_idx_used, reverse=True):
        reduced_pairs.pop(pair_idx_used)

    print("maximal matching produced {} trios and {} pairs (final).".format(len(trios_idx), len(pairs_idx)-len(trios_idx)))
    num_grouped_people = len(trios_idx)*3 + len(reduced_pairs)*2
    print("{} people have been grouped, with {} leftover.".format(num_grouped_people, n-num_grouped_people))

    trios = [(pairs[x[0]].p1.idx, pairs[x[0]].p2.idx, singles_idx[x[1]-len(pairs)]) for x in trios_idx]

    pairs = reduced_pairs

    grouped_idx_set = set()
    for pair in pairs:
        grouped_idx_set.add(pair.p1.idx)
        grouped_idx_set.add(pair.p2.idx)
    for trio in trios:
        grouped_idx_set.add(trio[0])
        grouped_idx_set.add(trio[1])
        grouped_idx_set.add(trio[2])
    leftovers = set()
    for i in range(1, n+1):
        if i not in grouped_idx_set:
            leftovers.add(i)
    return "Called"


class Person:
    # Initialises students with their sets of languages to teach and learn
    # Note: If we want to add pairing based on hobbies and majors, we will need to modify the constructor
    def __init__(self, idx, name, timestamp, practice1_lang, practice1_level, practice2_lang, practice2_level, teach1_lang, teach1_level, teach2_lang, teach2_level, gender, partnerGender, partnerGenderWeight, major, partnerMajor, partnerMajorWeight, days_of_week_dict):
        self.idx = idx
        #numerical representation of orientation attendance time, larger number means earlier orientation attendance
        #timestamp on csv file may need to be manually formatted to m/d/yyyy hh:mm:ss
        try:
            self.timestamp = ((datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S') - datetime(1970,1,1)).total_seconds()) / 3600
        except:
            self.timestamp = ((datetime.strptime(timestamp, '%Y-%m-%d') - datetime(1970,1,1)).total_seconds()) / 3600
        self.practice = {practice1_lang: practice1_level, practice2_lang: practice2_level}
        # If one of the keys of the dictionary is missing, remove that key value pair
        if "" in self.practice:
            del self.practice[""]
        # Set of languages that the students wants to learn
        self.practice_langs = set(self.practice.keys())
        self.teach = {teach1_lang: teach1_level, teach2_lang: teach2_level}
        # If one of the keys of the dictionary is missing, remove that key value pair
        if "" in self.teach:
            del self.teach[""]
        # Set of languages that the students wants to teach
        self.teach_langs = set(self.teach.keys())
        self.langs = self.practice_langs.union(self.teach_langs)
        self.profile = self.practice.copy()
        self.profile.update(self.teach)
        #self.profile = {**self.practice, **self.teach} for Python3
        self.gender = gender
        self.partnerGender = partnerGender
        self.partnerGenderWeight = partnerGenderWeight
        self.major = major
        self.partnerMajor = partnerMajor
        self.partnerMajorWeight = partnerMajorWeight
        self.days_of_week_dict = days_of_week_dict
        self.name = name

    def can_teach(self, partner):
        '''
        Checks if the student (self) can teach the same language that 'partner' wants to learn
        '''
        if self.idx != partner.idx: #if they are not the same people
            common_langs = self.teach_langs.intersection(partner.practice_langs) #if i teaches a language that j wants to learn
            if len(common_langs) > 0:
                for common_lang in common_langs:
                    if self.teach[common_lang] == 5: #teacher is fully proficient
                        return True
                    if self.teach[common_lang] - partner.practice[common_lang] >= 3: #teacher is significantly better
                        return True
        return False
    def __repr__(self):
        return str(self.profile)

class Pair:
    def __init__(self, p1, p2): #2 Persons
        self.p1 = p1
        self.p2 = p2
        self.timestamp = p1.timestamp + p2.timestamp
        # the languages that the pair is currently exchanging (should be 2 of them?)
        # potential loophole: what if by some magical coincidence, one person wants to teach the exact same two languages that the other person wants to learn?
        self.exchange_langs = set.intersection(p1.practice_langs, p2.teach_langs).union(set.intersection(p1.teach_langs, p2.practice_langs))
        self.p1_exchange_profile = dict()
        self.p2_exchange_profile = dict()
        self.combined_exchange_profile = dict()
        for lang in self.exchange_langs:
            self.p1_exchange_profile[lang] = self.p1.profile[lang]
            self.p2_exchange_profile[lang] = self.p2.profile[lang]
            self.combined_exchange_profile[lang] = [self.p1.profile[lang], self.p2.profile[lang]]
        # For keeping track of gender, creating set of gender. A set size of 1 means they are the same gender whereas a set size of 2 means different genders
        # In this case does not matter if there is no input for wantedGender since weight would just be 0
        self.combined_gender = {p1.gender, p2.gender}
        self.wanted_gender = dict()
        if p1.partnerGender == p2.partnerGender:
            self.wanted_gender[p1.partnerGender] = max(p1.partnerGenderWeight, p2.partnerGenderWeight)
        else:
            self.wanted_gender[p1.partnerGender] = p1.partnerGenderWeight
            self.wanted_gender[p2.partnerGender] = p2.partnerGenderWeight
        self.largest_wanted_gender = max(p1.partnerGenderWeight, p2.partnerGenderWeight)

        # Used a different, less rigoruos scheme for majors since they are a set
        self.combined_major = p1.major.union(p2.major)

        # Keeping track of intersection of days of week pair.
        self.combined_days_of_week_dict = p1.days_of_week_dict.intersection(p2.days_of_week_dict)

    def can_form_trio(self, partner, criteria=1):
        """
            Based on langs only, not secondary criteria
            criteria=1 is the strictest, third person must match the exchange profile of someone in the pair
            criteria=2 is less strict, third person should have exchange language levels +-1 compared to pairs. Preferred.
            criteria=3 is the most loose, third person just has to match exchange profile of pair
        """
        partner_exchange_profile = dict()
        for lang in partner.langs.intersection(self.exchange_langs):
            partner_exchange_profile[lang] = partner.profile[lang]
        if criteria == 1 :
            if partner_exchange_profile == self.p1_exchange_profile or partner_exchange_profile == self.p2_exchange_profile:
                return True
        elif criteria == 2:
            #if the third person is related to all of the pair's exchange languages
            if len(partner.langs.intersection(self.exchange_langs)) >= len(self.exchange_langs):
                #and the third person's practice lang is also being exchanged
                if len(set.intersection(partner.practice_langs, self.exchange_langs)) > 0:
                    for lang in self.combined_exchange_profile:
                        if partner_exchange_profile[lang] - self.combined_exchange_profile[lang][0] > 0 and partner_exchange_profile[lang] - self.combined_exchange_profile[lang][1] > 0:
                            return False
                    return True
        elif criteria == 3:
            if len(partner.langs.intersection(self.exchange_langs)) >= len(self.exchange_langs):
                return True
        return False
    def __repr__(self):
        return "p1: {}, p2: {}".format(self.p1.profile, self.p2.profile)

get_pref_key = {0: 0, 1: 100, 2: 200, 3: 400, 4: 800, 5: 1600}
not_get_pref_key = {0: 0, 1: -100, 2: -200, 3: -400, 4: -800, 5: -1600}

# Function for finding weight of timestamp (currently the only one in use)
def pair_find_timestamp_weight(person_1, person_2):
    print("Timestamp Weight: ", person_1.timestamp + person_2.timestamp)
    return person_1.timestamp + person_2.timestamp

# Function for finding weight of gender
def pair_find_gender_weight(person_1, person_2):
    genderCounter = 0
    # Checking whether partner1's preferred gender is partner2
    if (person_1.partnerGender == person_2.gender):
        genderCounter += get_pref_key[person_1.partnerGenderWeight]
    else:
        genderCounter += not_get_pref_key[person_1.partnerGenderWeight]
    # Checking whether partner2's preferred gender is partner1
    if (person_1.gender == person_2.partnerGender):
        genderCounter += get_pref_key[person_2.partnerGenderWeight]
    else:
        genderCounter += not_get_pref_key[person_2.partnerGenderWeight]
    print("Gender Weight: ", genderCounter)
    return genderCounter

# Function for finding weight of major
def pair_find_major_weight(person_1, person_2):
    majorCounter = 0
    # Checking if person1's preferred major is one of person2's major
    firstCross = person_1.partnerMajor.intersection(person_2.major)
    if (len(firstCross) >= 1):
        if ("No Response" in firstCross):
            majorCounter += 0
        else:
            majorCounter += get_pref_key[person_1.partnerMajorWeight]
    else:
        majorCounter += not_get_pref_key[person_1.partnerMajorWeight]
    # Checking if person2's preferred major is one of person1's major
    secondCross = person_2.partnerMajor.intersection(person_1.major)
    if (len(secondCross) >= 1):
        if ("No Response" in secondCross):
            majorCounter += 0
        else:
            majorCounter += get_pref_key[person_2.partnerMajorWeight]
    else:
        majorCounter += not_get_pref_key[person_2.partnerMajorWeight]
    print("Major Weight: ", majorCounter)
    return majorCounter


# Function for finding weight of days of week
def pair_find_days_of_week_weight(person_1, person_2):
    if (len(person_1.days_of_week_dict.intersection(person_2.days_of_week_dict)) == 0):
        print("Week Weight: -1000")
        return -1000
    else:
        print("Week Weight: 0")
        return 0

# Pair weight calculator
def pair_find_weight(person_1, person_2):
    total_weight = pair_find_timestamp_weight(person_1, person_2) + pair_find_gender_weight(person_1, person_2) + pair_find_major_weight(person_1, person_2) + pair_find_days_of_week_weight(person_1, person_2)
    print("Total Weight: ", total_weight)
    return total_weight

# Function for finding weight of timestamp (currently the only one in use)
def trio_find_timestamp_weight(pair, person):
    print("Timestamp Weight: ", pair.timestamp + person.timestamp)
    return pair.timestamp + person.timestamp

# Function for finding weight of gender
def trio_find_gender_weight(pair, person):
    # Overall counter
    genderCounter = 0
    # Below only crosses the pair's gender preferences to that of the partner - Picks on case from 1 - 4
    want_pair_gender_list = list(pair.wanted_gender.keys())
    # If wanted pair gender is the same
    if (len(want_pair_gender_list) == 1):
        want_pair_gender = want_pair_gender_list[0]
        # If pair wanted gender (both being the same) and person gender are the same
        if (want_pair_gender == person.gender):
#             print("Case Wanted: Joint Wanted Gender Pair to Person Gender Cross (1)")
            genderCounter += get_pref_key[pair.wanted_gender[want_pair_gender]]
        # If pair wanted gender (both being the same) and person gender are different
        else:
#             print("Case Not Wanted: Joint Wanted Gender Pair to Person Gender Cross (2)")
            genderCounter += not_get_pref_key[pair.wanted_gender[want_pair_gender]]
    # If pair contains 2 different wanted genders (in this case will half corresponding weights for cases)
    else:
        # If one person in pair (in this case wanted gender differs) wants the gender of the person being compared
        if (person.gender in want_pair_gender_list):
#             print("Case Half Wanted: Split Wanted Gender Pair to Person Gender Cross (3)")
            genderCounter += get_pref_key[pair.wanted_gender[person.gender]]/2
        # If pair wanted gender (in this case wanted gender differs) also differs with the gender of person being compared
        else:
#             print("Case Nothing Similar: Split Wanted Gender Pair to Person Gender Cross (4)")
            genderCounter += not_get_pref_key[pair.largest_wanted_gender]/2
    # Below only crosses the partner's gender preferences to that of the pair - Picks one case from 5 - 8
    pair_gender_list = list(pair.combined_gender)
    # If person wanted gender in the pair (both being the same)
    if (len(pair_gender_list) == 1):
        pair_gender = pair_gender_list[0]
        # If person wanted gender and the pair gender (both being same) are the same
        if (person.partnerGender == pair_gender):
#             print("Case Wanted : Wanted Person Gender to Joint Pair Gender Cross (5)")
            genderCounter += get_pref_key[person.partnerGenderWeight]
        # If person wanted gender and the pair gender (both being same) are different
        else:
#             print("Case Not Wanted: Wanted Person Gender to Joint Pair Gender Cross (6)")
            genderCounter += not_get_pref_key[person.partnerGenderWeight]
    # If pair contains only one of genders wanted by person (in this case will half corresponding weights for cases)
    else:
        # If one person in pair (in this case gender differs) contains person's wanted gender
        if (person.partnerGender in pair_gender_list):
#             print("Case Half Wanted: Wanted Person Gender to Split Gender Cross (7) ")
            genderCounter += get_pref_key[person.partnerGenderWeight]/2
        # If person wanted gender also differs with both genders in pair
        else:
#             print("Case Nothing Similar: Wanted Person to Split Gender Pair (8)")
            genderCounter += not_get_pref_key[person.partnerGenderWeight]/2
    print("Gender Weight: ", genderCounter)
    return genderCounter

# Function for finding weight of major
def trio_find_major_weight(pair, person):
    majorCounter = 0
    # Checking if person's preferred major is one of pair's major (ignored pair to person cross because assuming pair is matched on best major - this cross would cover too many cases and want to prioritize person entering pair)
    onlyCross = person.partnerMajor.intersection(pair.combined_major)
    if (len(onlyCross) >= 1):
        if ("No Response" in onlyCross):
            majorCounter += 0
        else:
            majorCounter += get_pref_key[person.partnerMajorWeight]
    else:
        majorCounter += not_get_pref_key[person.partnerMajorWeight]
    print("Major Weight: ", majorCounter)
    return majorCounter


# Function for finding weight of days of week
def trio_find_days_of_week_weight(pair, person):
    if (len(pair.combined_days_of_week_dict.intersection(person.days_of_week_dict)) == 0):
        print("Week Weight: -1000")
        return -1000
    else:
        print("Week Weight: 0")
        return 0

# Trio weight calculator
def trio_find_weight(pair, person):
    total_weight = trio_find_timestamp_weight(pair, person) + trio_find_gender_weight(pair, person) + trio_find_major_weight(pair, person) + trio_find_days_of_week_weight(pair, person)
    print("Total Weight: ", total_weight)
    return total_weight