import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  
  const parsedInterviewers = interviewers.map((elm) => {
    if (value === elm.id) {
      return <InterviewerListItem selected={elm.id === value} setInterviewer={() => onChange(elm.id)} id={elm.id} name={elm.name} avatar={elm.avatar} key={elm.id} />
    }
    return <InterviewerListItem setInterviewer={() => onChange(elm.id)} id={elm.id} name={elm.name} avatar={elm.avatar} key={elm.id} />
  });

  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};