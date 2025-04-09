import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import Posts from "../components/PostsDisplay";

afterEach(() => {
  cleanup();
});

//want to test if the link is clicked it will render the Home component
//want to test if header is Code Leə

test("loads NavBar header", async () => {
  //ARRANGE

  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  //ACT

  await screen.findByRole("heading");

  //ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("Code Leə");
});

test("navigates to posts component by button click", async () => {
  //ARRANGE

  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts posts={[]} />} />
      </Routes>
    </BrowserRouter>
  );

  //ACT
  await user.click(screen.getByRole('link', {name: /posts/i}));

  //ASSERT
  expect(screen.getByRole('heading', {name: /posts/i, level: 1})).toBeInTheDocument();

});
