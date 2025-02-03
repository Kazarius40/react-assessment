import {IUser} from "../../../../models/user/IUser.ts";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../../../services/api.service.ts";
import "./RecipeAuthor.css"

interface IRecipeAuthorProps {
    authorId: number;
}

export const RecipeAuthor = ({authorId}: IRecipeAuthorProps) => {
    const [author, setAuthor] = useState<IUser | null>(null);

    useEffect(() => {
        axiosInstance.get<IUser>('/auth/users/' + authorId).then(({data}) => setAuthor(data));
    }, [authorId]);

    if (!author) return null;

    return (
        <p className="recipe-author-container">
            Автор: <Link className="recipe-author-link" to={'/auth/users/' + author.id}>{author.firstName} {author.lastName}</Link>
        </p>
    );
};
