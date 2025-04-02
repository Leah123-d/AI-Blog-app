-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.2

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
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id serial PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    content VARCHAR(100),
    favorite BOOLEAN NOT NULL,
    comments VARCHAR(255),
    post_image VARCHAR,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_on timestamp default CURRENT_TIMESTAMP not null

);

--
-- Name: socials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.socials (
    id serial PRIMARY KEY,
    author VARCHAR(255),
    twitter VARCHAR(500),
    youtube VARCHAR(500),
    linkedIn VARCHAR(500),
    instagram VARCHAR(500)
);

--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--
INSERT INTO public.posts (author, title, content, favorite, comments,post_image)
VALUES 
    ('Allegra', 'Treat yourself: The art of textiles', 'content','false','great summary of content!',''),
    ('Toby', 'Purring: How to Heal', 'purrs can heal cited by a study','true','',''),
    ('Cassie', 'TBD', 'TBD','false','TBD',''),
    ('Target', 'TBD', 'TBD','false','TBD','');


--
-- Data for Name: socials; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.socials (author, twitter, youtube, linkedIn, instagram)
VALUES 
    ('Allegra', '@treats3', 'youtube/@treats3', '','@3_cat123'),
    ('Toby', '', 'youtube/@meow', '','@meowington'),
    ('Cassie','@tortie1', '','','pawsandtorties'),
    ('Target', '@browntabby', 'youtube@targettabby', '@thebrowntabby','@targettabby');

-- PostgreSQL database dump complete
--




