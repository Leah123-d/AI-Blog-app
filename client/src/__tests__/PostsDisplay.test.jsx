import React from "react";
import "@testing-library/jest-dom";
import { expect, test, jest, afterEach } from "@jest/globals";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import Posts from "../components/PostsDisplay";

afterEach(() => {
  cleanup();
});

test("user can click view post", async () => {
  const mockFetchPosts = jest.fn();
  const mockHandleViewPost = jest.fn();
  const mockFetchPostSearch = jest.fn();
  const mockHandleSearchDate = jest.fn();
  const mockHandleSearchReset = jest.fn();

  render(
    <BrowserRouter>
      <Posts
        posts={[]}
        fetchPosts={mockFetchPosts}
        handleViewPost={mockHandleViewPost}
        fetchPostSearch={mockFetchPostSearch}
        searchDate="2010-01-10"
        handleSearchDate={mockHandleSearchDate}
        searchPost={null}
        handleSearchReset={mockHandleSearchReset}
      />
    </BrowserRouter>
  );

  const dateInput = screen.getByLabelText(/enter a date/i);
  await userEvent.type(dateInput, "2010-01-10");


  const searchButton = screen.getByRole("button", {name: /search/i});
  await userEvent.click(searchButton);
  
  expect(mockHandleSearchDate).toBeCalled();
  expect(mockFetchPostSearch).toHaveBeenCalledWith("2010-01-10");
  
});

//write a test for the submit to view post
