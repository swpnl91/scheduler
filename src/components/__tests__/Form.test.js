import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers} save={() => {}} onCancel={() => {}} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form interviewers={interviewers} currentStudent="Lydia Miller-Jones" save={() => {}} onCancel={() => {}} />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  
  it("validates that the student name is not blank", () => {
    
    const save = jest.fn(); 
    const {getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="" onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));
    
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    
    expect(save).not.toHaveBeenCalled();
  });
  
  // it("calls save function when the name is defined", () => {
  //   
  //   const save = jest.fn(); 
  //   const {queryByText, getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" onCancel={() => {}} />);
  //   fireEvent.click(getByText("Save"));

  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
  //   
  //   expect(save).toHaveBeenCalledTimes(1);
  
  //   
  //   expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  // it("submits the name entered by the user", () => {
  //   const save = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} save={save} student="Lydia Miller-Jones" onCancel={() => {}} />
  //   );
  
  //   const input = getByPlaceholderText("Enter Student Name");
  
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } }); //triggers the onChange event for the input field. With this change we execute teh code on line 40 and increases our code coverage (function coverage)
  //   fireEvent.click(getByText("Save"));
  
  //   expect(save).toHaveBeenCalledTimes(1);
  //   expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  //this test replaces the above 2 tests and adds an additonal layer that ensures that the student name cannot be blank message disapears afeter a correct save/submission is made
  it("can successfully save after trying to submit an empty student name", () => {
    const save = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} save={save} student="Lydia Miller-Jones" currentInterviewer={1} onCancel={() => {}} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the student name input field and the interviewer selection to null", () => {
    
    const onCancel = jest.fn();
    const save = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
    <Form interviewers={interviewers} save={save} currentInterviewer={null} onCancel={onCancel} />
    );
      
    
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));
     

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    
    //fire event click on the cancel button
    fireEvent.click(getByText("Cancel"));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("validates that the interviewer selection is not null", () => {
    const save = jest.fn();
    const {getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" currentInterviewer={null} onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));
    
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    expect(save).not.toHaveBeenCalled();
  });

    it("calls save function when the interviewre is not null (and selected)", () => {
    
    const save = jest.fn(); 
    const {queryByText, getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" currentInterviewer={8} onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));

    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    
    expect(save).toHaveBeenCalledTimes(1);
  
    
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 8);
  });

});