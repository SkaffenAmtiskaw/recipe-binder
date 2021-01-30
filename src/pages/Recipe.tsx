import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Heading } from 'evergreen-ui';
import { get } from 'dot-prop';

import { Recipe as RecipeType } from '../types';

type Props = {
  recipes: RecipeType[]
};

type Params = {
  id: string
}

const Recipe: FunctionComponent<Props> = ({ recipes }) => {
  const { id } = useParams<Params>();

  const recipe = recipes.find(recipe => recipe.id === id);

  return (
    <Heading>{get(recipe, 'title', '')}</Heading>
  );
};

export default Recipe;
