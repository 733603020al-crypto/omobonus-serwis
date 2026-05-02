import { motion } from "framer-motion"

export default function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">

            <div className="text-white text-xl mb-4">
                LOADING...
            </div>

            <motion.div
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: 'linear'
                }}
            />

        </div>
    )
}