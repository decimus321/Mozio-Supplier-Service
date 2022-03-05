import React from 'react';
import {motion} from 'framer-motion'

const ModalBackgroundVariants = {
    initial: {opacity: 0},
    animate: {
        opacity: 0.5, transition: {duration: 0.3, type: "linear"},
    }
}
const ModalBackground = ({PolygonModeSetter}) => {
    return <motion.div
        onClick={() => PolygonModeSetter(false)}
        variants={ModalBackgroundVariants}
        initial={'initial'}
        animate={'animate'}
        className={"top-0 absolute w-screen h-screen bg-black"}/>
};

export default ModalBackground;