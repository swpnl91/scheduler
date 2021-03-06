
export const getAppointmentsForDay = function(state, day) {
  const resultArr = [];
  
  if (state.days.length === 0) {
    return resultArr;
  }

  const apptKeysArr = Object.keys(state.appointments);
  
  const dailyAppts = state.days.filter((elm) => {
    return elm.name === day;
  });

  if (dailyAppts.length === 0) {
    return resultArr;
  }

  for (const key of apptKeysArr) {
    if (dailyAppts[0].appointments.includes(Number(key))) {
      resultArr.push(state.appointments[key]);
    }
  }

  return resultArr;
};


export const getInterview = function (state, interview) {
  const newObj = {};
  const interviewerObj = state.interviewers;
  if (!interview) {
    return null;
  }
  for (const key in interviewerObj) {
    if (Number(key) === interview.interviewer) {
      newObj.student = interview.student;
      newObj.interviewer = state.interviewers[key];
    }
  }
  return newObj;
}


export const getInterviewersForDay = function(state, day) {
  const resultArr = [];
  
  if (state.days.length === 0) {
    return resultArr;
  }

  const interKeysArr = Object.keys(state.interviewers);
  
  const dailyinter = state.days.filter((elm) => {
    return elm.name === day;
  });

  if (dailyinter.length === 0) {
    return resultArr;
  }

  for (const key of interKeysArr) {
    if (dailyinter[0].interviewers.includes(Number(key))) {
      resultArr.push(state.interviewers[key]);
    }
  }

  return resultArr;
};