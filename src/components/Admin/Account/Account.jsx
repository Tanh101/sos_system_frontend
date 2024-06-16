import { faBan, faCheck, faSearch, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Select, Space, Table, Tag } from 'antd';
import { t, use } from 'i18next';
import React, { useEffect, useState } from 'react';
import { USER_STATUS, USER_STATUS_TEXT } from '../../../constants/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserService from '../../../services/UserService';

const Account = () => {
    const { getUsers, updateUserStatus } = UserService();

    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const [filterStatus, setFilterStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [activeMenu, setActiveMenu] = useState('user')

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });


    const fetchUsers = async (role = 'user', pagination = tableParams.pagination) => {
        setLoading(true);
        try {
            const response = await getUsers(role, pagination.current, pagination.pageSize);
            const res = response?.users?.map((user, index) => {
                return {
                    key: index,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    status: user.status,
                    id: user.id,
                };
            });
            setData(res);

            setTableParams({
                ...tableParams,
                pagination: {
                    ...pagination,
                    total: response.pagination.total,
                },
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleChangeStatus = async (id) => {
        await updateUserStatus(id);
        fetchUsers(activeMenu);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        fetchUsers(activeMenu, pagination);
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <>
                    <Tag color={status === USER_STATUS.ACTIVE ? 'geekblue' : status === USER_STATUS.ACTIVE ? 'red' : 'pink'} key={status}>
                        {USER_STATUS_TEXT[status]}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space className='cursor-pointer' size="middle">
                    {
                        record.status === USER_STATUS.PENDING ? (
                            <FontAwesomeIcon icon={faCheck} color='blue' size='lg' onClick={() => handleChangeStatus(record.id)} />
                        ) : record.status === USER_STATUS.ACTIVE ? (
                            <FontAwesomeIcon icon={faBan} color='red' size='lg' onClick={() => handleChangeStatus(record.id)} />
                        ) : (
                            <FontAwesomeIcon icon={faUnlock} color='blue' size='lg' onClick={() => handleChangeStatus(record.id)} />
                        )
                    }
                </Space>
            ),
        },
    ];

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchByChange = (value) => {
        setSearchBy(value);
    };

    const handleFilterStatusChange = (value) => {
        setFilterStatus(value);
    };

    useEffect(() => {
        setTimeout(() => {
            fetchUsers();
        }, 1000);
    }, [search, searchBy, filterStatus]);


    const handleClickMenu = (menu) => () => {
        setActiveMenu(menu);
        if (menu === 'user') {
            fetchUsers('user');
        }
        if (menu === 'rescuer') {
            fetchUsers('rescuer');
        }
    }

    return (
        <div>
            <div className="flex">
                <p className='font-medium text-lg'>
                    Account Management
                </p>
                <button className={`${activeMenu === 'user' ? 'bg-red-600 text-white ' : ''} rounded-lg px-2 py-1 mx-5`}
                    onClick={handleClickMenu('user')}
                >
                    {t("Người dùng")}
                </button>
                <button className={`${activeMenu === 'rescuer' ? 'bg-red-600 text-white ' : ''} rounded-lg px-2 py-1 mx-5`}
                    onClick={handleClickMenu('rescuer')}
                >
                    {t("Cứu hộ")}
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center w-60 px-2 py-1 m-2 border outline-none focus:border-red-600 rounded-xl text-sm">
                        <FontAwesomeIcon icon={faSearch} color='red' size='lg' />
                        <input
                            className="outline-none w-full ml-2"
                            type="text"
                            placeholder={t("Search user...")}
                            onChange={(e) => handleChangeSearch}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <label className='text-[0.8rem] opacity-85' htmlFor="name">Search By</label>
                        <Select defaultValue="name" className="w-20 m-2" onChange={handleSearchByChange}>
                            <Select.Option value="name">Name</Select.Option>
                            <Select.Option value="email">Email</Select.Option>
                            <Select.Option value="address">Address</Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="flex">
                    <Select defaultValue="all" className="w-40 m-2" onChange={handleFilterStatusChange}>
                        <Select.Option value="all">Status</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="deleted">Deleted</Select.Option>
                    </Select>
                </div>
            </div>
            {data &&
                <div className="flex w-full">
                    <Table
                        className="w-full"
                        columns={columns}
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </div>
            }
        </div>
    );
};

export default Account;
