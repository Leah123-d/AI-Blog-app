import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import Posts from "../components/PostsDisplay";

afterEach(() => {
  cleanup();
});

//write a test for the submit to view post 
