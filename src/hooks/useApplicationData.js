// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import axios from 'axios';


const useApplicationData = function(initial) {
  const [state, setState] = useState({
    selectedDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const baseURL = "http://localhost:8001";

  
  const updateSpots = function(state, appointments, id) {
    let spots = 0;

    const day = state.days.find(elm => elm.name === state.selectedDay);

    for (const id of day.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = {...day, spots};
    
    const newDays = state.days.map((elm) => {
      if (elm.name === state.selectedDay) {
        return newDay;
      } else {
        return elm;
      }
    })
    return newDays;
  }

  
  useEffect(() => {
    const appointmentsPromise = axios.get(baseURL+"/api/appointments");
    const daysPromise = axios.get(baseURL+"/api/days");
    const interviewersPromise = axios.get(baseURL+"/api/interviewers");

    const promises = [daysPromise, appointmentsPromise, interviewersPromise ];

    Promise.all(promises)
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  
  const setSelectedDay = selectedDay => setState({ ...state, selectedDay });

  
  const bookInterview = async function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    await axios.put(baseURL+`/api/appointments/${id}`, {interview})
    .then((response) => {
      const days = updateSpots(state, appointments, id);
      setState({...state, days, appointments});
    })
  }

  
  const cancelInterview = async function(id) {
    const deletedAppointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: deletedAppointment};
    await axios.delete(baseURL+`/api/appointments/${id}`)
    .then((response) => {
      const days = updateSpots(state, appointments, id);
      setState({...state, days, appointments});
    })
  }

  return {
    state,
    setSelectedDay,
    bookInterview,
    cancelInterview
  };
}

export default useApplicationData;