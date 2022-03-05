import React from 'react';
import {Link} from 'react-router-dom'

const SelectClass = (props) => {
    return (
        <div className={"relative top-1/2 translate-y-[-150%] font-sans  uppercase font-bold"}>
            <h1 className={'text-white text-center text-2xl'}>Which class are you?</h1>
            <div className={'flex w-1/4 mx-auto mt-16 justify-between text-custom-yellow text-lg'}>
                <Link to={'supplier/register'}
                      className={'w-36 text-center py-2 px-6 hover:bg-custom-green-dark transition-ease-in-out duration-150 cursor-pointer hover:shadow'}>
                    Supplier
                </Link>
                <Link to={'administration/login'}
                      className={'w-36 text-center py-2 px-6 hover:bg-custom-green-dark transition-ease-in-out duration-150 cursor-pointer hover:shadow'}>
                    Admin
                </Link>
            </div>
        </div>
    )
};

export default SelectClass;