import React from 'react';
import PropTypes from 'prop-types';

const Disponibilite = ({ schedule }) => {
    if (!schedule || schedule.length === 0) {
        return <p>No schedule available</p>;
    }

    return (
        <div>
            {schedule[1] && (
                <p>Sunday: {schedule[0].StartTime} - {schedule[0].EndTime}</p>
            )}
            {schedule[2] && (
                <p>Monday: {schedule[1].StartTime} - {schedule[1].EndTime}</p>
            )}
            {schedule[3] && (
                <p>Tuesday: {schedule[2].StartTime} - {schedule[2].EndTime}</p>
            )}
            {schedule[4] && (
                <p>Wednesday: {schedule[3].StartTime} - {schedule[3].EndTime}</p>
            )}
            {schedule[5] && (
                <p>Thursday: {schedule[4].StartTime} - {schedule[4].EndTime}</p>
            )}
            {schedule[6] && (
                <p>Friday: {schedule[5].StartTime} - {schedule[5].EndTime}</p>
            )}
            {schedule[7] && (
                <p>Saturday: {schedule[6].StartTime} - {schedule[6].EndTime}</p>
            )}
        </div>
    );
};

Disponibilite.propTypes = {
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            StartTime: PropTypes.string.isRequired,
            EndTime: PropTypes.string.isRequired
        })
    )
};

export default Disponibilite;