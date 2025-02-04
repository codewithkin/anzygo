import { motion } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const variants = {
  initial: { opacity: 0, x: -20 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const Avatars = () => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.5, delay: 2 }}
      className="flex gap-2"
    >
      <article>
        <h2 className="font-medium text-xl flex flex-col gap-2">
          Join 200+ users
        </h2>

        <article className="flex gap-[-0.5rem]">
          <Avatar>
            <AvatarImage src="/images/kin.jpg" alt="Avatar 1" />
            <AvatarFallback delayMs={600}>J</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/images/mouse.jpg" alt="Avatar 2" />
            <AvatarFallback delayMs={600}>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/images/morty.jpeg" alt="Avatar 3" />
            <AvatarFallback delayMs={600}>T</AvatarFallback>
          </Avatar>
        </article>
      </article>
    </motion.div>
  )
}

