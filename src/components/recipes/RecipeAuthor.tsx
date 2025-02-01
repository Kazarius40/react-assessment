import { IUser } from "../../models/user/IUser.ts";
import { Link } from "react-router-dom";

interface IRecipeAuthorProps {
    author: IUser | null;
}

export const RecipeAuthor = ({ author }: IRecipeAuthorProps) => {
    if (!author) return null;

    return (
        <p>
            Автор: <Link to={'/auth/users/' + author.id}>{author.firstName} {author.lastName}</Link>
        </p>
    );
};
