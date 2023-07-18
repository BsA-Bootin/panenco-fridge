import { Exclude, Expose } from "class-transformer";

@Exclude()
export class IngredientView {
    @Expose()
    public name: string;
}