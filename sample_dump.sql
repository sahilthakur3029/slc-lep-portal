--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authusers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.authusers (
    id integer NOT NULL,
    email character varying NOT NULL
);


--
-- Name: authusers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.authusers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: authusers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.authusers_id_seq OWNED BY public.authusers.id;


--
-- Name: formmang; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.formmang (
    orientation_key character varying(50),
    semester character varying(50),
    all_weeks character varying,
    calendar_link character varying
);


--
-- Name: intakeform; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.intakeform (
    first_name character varying(50),
    last_name character varying(50),
    email character varying,
    academic_title character varying(50),
    residency character varying(50),
    major character varying,
    gender character varying(50),
    gender_custom character varying(50),
    availability character varying[],
    hope_to_gain character varying,
    plan_to_meet character varying,
    f_c_learn character varying(50),
    f_c_learn_other character varying(50),
    f_c_learn_level integer,
    s_c_learn character varying(50),
    s_c_learn_other character varying(50),
    s_c_learn_level integer,
    f_c_teach character varying(50),
    f_c_teach_other character varying(50),
    f_c_teach_level integer,
    s_c_teach character varying(50),
    s_c_teach_other character varying(50),
    s_c_teach_level integer,
    comments character varying,
    p_major character varying,
    p_major_weight integer,
    p_gender character varying(50),
    p_gender_custom character varying(50),
    p_gender_weight integer,
    waiver_accept character varying,
    "timestamp" timestamp without time zone
);


--
-- Name: pairs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pairs (
    "timestamp" timestamp without time zone,
    first character varying(50),
    last character varying(50),
    email character varying,
    level character varying(50),
    teach character varying,
    learn character varying,
    comments character varying,
    timestamp_1 timestamp without time zone,
    first_1 character varying(50),
    last_1 character varying(50),
    email_1 character varying,
    level_1 character varying(50),
    teach_1 character varying,
    learn_1 character varying,
    comments_1 character varying,
    timestamp_2 timestamp without time zone,
    first_2 character varying(50),
    last_2 character varying(50),
    email_2 character varying,
    level_2 character varying(50),
    teach_2 character varying,
    learn_2 character varying,
    comments_2 character varying
);


--
-- Name: timesheet; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.timesheet (
    first_name character varying(50),
    last_name character varying(50),
    partner_names character varying,
    hours character varying(50),
    week character varying(50)
);


--
-- Name: unpaired; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.unpaired (
    "timestamp" timestamp without time zone,
    first character varying(50),
    last character varying(50),
    email character varying,
    level character varying(50),
    teach character varying,
    learn character varying,
    comments character varying
);


--
-- Name: authusers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.authusers ALTER COLUMN id SET DEFAULT nextval('public.authusers_id_seq'::regclass);


--
-- Data for Name: authusers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.authusers (id, email) FROM stdin;
1	sahilthakur@berkeley.edu
\.


--
-- Data for Name: formmang; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.formmang (orientation_key, semester, all_weeks, calendar_link) FROM stdin;
iloveslc	Spring 2022	[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]	bit.ly/slc-sp21
\.


--
-- Data for Name: intakeform; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.intakeform (first_name, last_name, email, academic_title, residency, major, gender, gender_custom, availability, hope_to_gain, plan_to_meet, f_c_learn, f_c_learn_other, f_c_learn_level, s_c_learn, s_c_learn_other, s_c_learn_level, f_c_teach, f_c_teach_other, f_c_teach_level, s_c_teach, s_c_teach_other, s_c_teach_level, comments, p_major, p_major_weight, p_gender, p_gender_custom, p_gender_weight, waiver_accept, "timestamp") FROM stdin;
Xaio	Lu	lx0222@berkley.edu	Undergraduate	International	CS	Male		{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday}	Chance to contact with people from different culture, learn something new, somehow improve my social phobia(laugh)	I will try to plan some interesting activities during our meeting to leave a good experenice when we meet so that both of us will be more willing to meet with each other	Japanese		1	Spanish		1	Mandarin		5	English		3			0	Female		4	Xiao Lu	2021-03-31 21:25:55
Megan	Yu	meganyu@berkeley.edu	Undergraduate	Domestic US	Computer Science	Female		{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday}	I hope to become a lot more confident about speaking in Korean and Mandarin with others	Find a set time to commit to meeting every week and treat it like a class by not scheduling anything else around that time	Korean		3	Mandarin		3	English		5			0			0			0	Megan Yu	2021-03-31 21:26:31
Zoe	Zhang	zhangyi907@berkeley.edu	Undergraduate	International	Computer Science	Female		{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday}	To speak English frequently and make friends : )	By practicing every day on my own to remind me that the meeting weekly is important	English		3	Spanish		1	Mandarin		5			0			0	Female		2	Zoe Zhang	2021-03-31 21:28:11
Thomas	Boatright	thomasboatright@berkeley.edu	Undergraduate	Domestic US	Global Studies	Male		{Sunday,Monday,Tuesday,Wednesday,Thursday,Friday}	I hope to improve my language abilities and make new friends!	Good communication, as well as scheduling times when we are both available.	Mandarin		3	Mandarin		3	English		5	English		5			0			0	Thomas Boatright	2021-03-31 21:30:32
Jiankun	Li	lijiankun@berkeley.edu	Undergraduate	International	Mathematics	Male		{Sunday,Tuesday,Wednesday,Thursday,Friday,Monday}	Better speaking English and information about different cultures.	With my enthusiasm and friendship between us.	English		2			0	Mandarin		5			0			0			0	Jiankun Li	2021-03-31 21:33:21
Benjamin	Brock	brock@berkeley.edu	Graduate	Domestic US		Male		{Sunday,Tuesday,Wednesday,Thursday,Friday,Monday}	I hope to improve my conversation ability in Mandarin, Cantonese, and French.	Picking interesting discussion topics	Mandarin		3	Cantonese		2	English		5			0			0			0	Benjamin Brook	2021-03-31 21:35:54
\.


--
-- Data for Name: pairs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pairs ("timestamp", first, last, email, level, teach, learn, comments, timestamp_1, first_1, last_1, email_1, level_1, teach_1, learn_1, comments_1, timestamp_2, first_2, last_2, email_2, level_2, teach_2, learn_2, comments_2) FROM stdin;
2021-03-31 21:26:31	Megan	Yu	meganyu@berkeley.edu	Undergraduate	{"English": 5}	{"Korean": 3, "Mandarin": 3}		2021-03-31 21:28:11	Zoe	Zhang	zhangyi907@berkeley.edu	Undergraduate	{"Mandarin": 5}	{"English": 3, "Spanish": 1}		\N	\N	\N	\N	\N	\N	\N	\N
2021-03-31 21:30:32	Thomas	Boatright	thomasboatright@berkeley.edu	Undergraduate	{"English": 5}	{"Mandarin": 3}		2021-03-31 21:33:21	Jiankun	Li	lijiankun@berkeley.edu	Undergraduate	{"Mandarin": 5}	{"English": 2}		2021-03-31 21:35:54	Benjamin	Brock	brock@berkeley.edu	Graduate	{"English": 5}	{"Mandarin": 3, "Cantonese": 2}	
\.


--
-- Data for Name: timesheet; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.timesheet (first_name, last_name, partner_names, hours, week) FROM stdin;
Sahil	Thakur	Riddhi	3	Week 6
\.


--
-- Data for Name: unpaired; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.unpaired ("timestamp", first, last, email, level, teach, learn, comments) FROM stdin;
2021-03-31 21:25:55	Xaio	Lu	lx0222@berkley.edu	Undergraduate	{"Mandarin": 5, "English": 3}	{"Japanese": 1, "Spanish": 1}	
\.


--
-- Name: authusers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.authusers_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

