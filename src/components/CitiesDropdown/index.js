import React from 'react';
import Select from 'react-select';

const CitiesDropdown = ({
    isMultiSelect,
    onChange,
    onClick,
    onClickBack,
    cities
}) => {
    return (
        <div id="components-dropdown-demo-dropdown-button" className="card">
            <button onClick={onClickBack}>Back</button>
            <Select
                isMulti={isMultiSelect}
                name="cities"
                options={cities}
                onChange={onChange}
                className="basic-multi-select"
                classNamePrefix="select"
            />
            <button onClick={onClick}>Next</button>
        </div>
    );
};

export default CitiesDropdown;