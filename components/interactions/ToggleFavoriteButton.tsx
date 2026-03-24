"use client";

import useFavorites from "@/hooks/useFavorites";
import CustomLink from "@/components/interactions/CustomLink";

export default function ToggleFavoriteButton({ 
    id,
    text = {
        active: "Favorite",
        inactive: "Favorite"
    },
}: {
    id: string;
    text?: {
        active: string;
        inactive: string;
    };
}) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { active: activeText, inactive: inactiveText } = text;

    return (
        <CustomLink
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                toggleFavorite(id);
            }}
            className="mt-2 text-sm text-red-500"
        >
            {isFavorite(id) ? `❤️ ${activeText}` : `🤍 ${inactiveText}`}
        </CustomLink>
    );
}
