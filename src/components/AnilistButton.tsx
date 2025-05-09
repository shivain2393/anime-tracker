import Link from "next/link"
import { Button } from "./ui/button"
import { FiExternalLink } from "react-icons/fi";

const AnilistButton = ({ animeLink }: { animeLink: string }) => {
    return (
        <Button variant='link' size='sm' className="text-muted-foreground inline-flex items-center gap-1" asChild>
            <Link target="_blank" href={animeLink}>
                Anilist
                <FiExternalLink className="w-3.5 h-3.5"/>
            </Link>
        </Button>
    )
}

export default AnilistButton;