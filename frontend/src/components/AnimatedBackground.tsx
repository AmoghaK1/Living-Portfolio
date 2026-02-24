import { motion } from "framer-motion"

export default function AnimatedBackground(){

return(

<div className="fixed inset-0 -z-10 overflow-hidden">

<motion.div
animate={{
x:[-100,100,-100],
y:[-50,50,-50]
}}
transition={{
duration:20,
repeat:Infinity
}}
className="
absolute
w-[800px]
h-[800px]
bg-gradient-to-r
from-purple-300
via-blue-300
to-pink-300
opacity-30
blur-3xl
rounded-full
"
/>

<motion.div
animate={{
x:[100,-100,100],
y:[50,-50,50]
}}
transition={{
duration:25,
repeat:Infinity
}}
className="
absolute
right-0
bottom-0
w-[800px]
h-[800px]
bg-gradient-to-r
from-green-300
via-cyan-300
to-blue-300
opacity-30
blur-3xl
rounded-full
"
/>

</div>

)

}