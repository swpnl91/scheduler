import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  
  const { days, onChange, value  } = props;

  const parsedDaysArray = days.map((elm) => {
    if (value === elm.name) {
      return <DayListItem setDay={onChange} key={elm.id} spots={elm.spots} name={elm.name} selected />;
    } else {
      return <DayListItem setDay={onChange} key={elm.id} spots={elm.spots} name={elm.name} />;
    }
  });
  
  
  return (
    <ul>
      {parsedDaysArray}
    </ul>
  );
}


