import React from 'react';
import Select, { components } from 'react-select';
import { Tooltip } from 'antd';

const CustomSelect = ({ requestType, errors, register }) => {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: errors.requestType ? '#F73334' : provided.borderColor,
            '&:hover': {
                borderColor: '#F73334',
            },
            boxShadow: state.isFocused ? '0 0 0 2px #F73334' : provided.boxShadow,
        }),
        option: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
        }),
    };

    const Option = (props) => {
        return (
            <components.Option {...props}>
                <Tooltip title={props.data.name} color="red">
                    <img width={30} src={props.data.iconUrl} alt={props.data.name} />
                </Tooltip>
            </components.Option>
        );
    };

    const SingleValue = (props) => {
        return (
            <components.SingleValue {...props}>
                <Tooltip title={props.data.name} color="red">
                    <img width={20} src={props.data.iconUrl} alt={props.data.name} />
                </Tooltip>
            </components.SingleValue>
        );
    };

    const options = requestType.map((type) => ({
        value: type.id,
        label: type.name,
        name: type.name,
        iconUrl: type.iconUrl,
    }));

    return (
        <div>
            <Select
                styles={customStyles}
                defaultValue={options[0]}
                options={options}
                components={{ Option, SingleValue }}
                name="requestType"
                {...register("requestType")}
            />
            {errors.requestType && (
                <div className="flex">
                    <p className="text-red">{errors.requestType.message}</p>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
