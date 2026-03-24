import useFavorites from "@/hooks/useFavorites";
import CustomLink from "@/components/interactions/CustomLink";

export default function ToggleFavoriteButton({ 
    id,
    text = "Favorite",
}: {
    id: string;
    text?: string;
}) {
    const { isFavorite, toggleFavorite } = useFavorites();

    return (
        <CustomLink
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                toggleFavorite(id);
            }}
            className="mt-2 text-sm text-red-500"
        >
            {isFavorite(id) ? `❤️ ${text}` : `🤍 ${text}`}
        </CustomLink>
    );
}
