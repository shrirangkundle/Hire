import { Calendar, Col, Radio, Row, Select, Typography,Badge,DatePicker } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from "./Icons";
import _ from "underscore"

const CustomCalendar = (props) => {
  const navigate = useNavigate();
    const getListData = (value) => {
        let listData;
      
        switch (value.date()) {
          case 8:
            listData = [
              {
                type: 'warning',
                content: 'This is warning event.',
              }
            ];
            break;
      
          case 10:
            listData = [
              {
                type: 'warning',
                content: 'This is warning event.',
              }
            ];
            break;
      
          case 15:
            listData = [
              {
                type: 'warning',
                content: 'This is warning event',
              }
            ];
            break;
      
          default:
        }
      
        return listData || [];
      };
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  
  };

  const selectHandler = (value) => {
    if(props.redirectLink) {
      navigate( `${props.redirectLink}?selected_date=${moment(value).format("YYYY-MM-DD")}`)
    } else {
      navigate( `/recuiter/admin?selected_date=${moment(value).format("YYYY-MM-DD")}`)
    }
  
  }

  let getMeetings = (value) => {
    let meetings = props.meetings
    let result = [];
    if(meetings) {
      let curData = moment(value).format("YYYY-MM-DD")
      let meetingIndex = _.findIndex(meetings, m => moment(m.date).format("YYYY-MM-DD") == curData)
      if(meetingIndex != -1) {
        result.push(meetings[meetingIndex])
      }
    }
    return result
  }
  const dateCellRender = (value) => {   
    const listData = getMeetings(value);
    return (
        <div className="custom-cell">{moment(value).format("DD")} {listData.length>0 && <div className='event'></div>}</div>
    );
  };
  return (
    <div  style={{position: 'relative' }} id="calender-area">
      <DatePicker 
        open={true}
        // picker={"week"}
        defaultValue={moment(new Date())}
        onSelect={selectHandler}
        getPopupContainer={() => document.getElementById('calender-area')}
        dateRender={(currentDate, today) => dateCellRender(currentDate)}
      />
    </div>
  )
};

export default CustomCalendar;