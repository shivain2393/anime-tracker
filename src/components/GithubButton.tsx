import Link from "next/link"
import { Button } from "./ui/button"
import { FaGithub } from "react-icons/fa"

const GithubButton = () => {
    return (
        <Button className="cursor-pointer" size='icon' variant='ghost' asChild>
            <Link href="https://github.com/shivain2393/anime-tracker">
                <FaGithub />
            </Link>
        </Button>
    )
}

export default GithubButton;