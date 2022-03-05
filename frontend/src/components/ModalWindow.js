import React from 'react';
import {motion} from 'framer-motion'

const ModalWindowVariants = {
    initial: {opacity: 0},
    animate: {
        opacity: 1, transition: {duration: 0.3, type: "linear"},
    }
}
const ModalWindow = ({children, PolygonModeSetter}) => (
    <motion.div variants={ModalWindowVariants} initial={'initial'} animate={'animate'}
                className={'w-1/3 py-6 px-4 bg-custom-green absolute top-[10%] left-1/2 translate-x-[-50%]'}
    >
        {children}
    </motion.div>
)

export default ModalWindow;