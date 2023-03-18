import { get } from 'dot-prop';
import { BackButton, Heading, majorScale } from 'evergreen-ui';
import { paramCase } from 'param-case';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { FunctionComponent } from 'react';

import db from '@firebase/db';
import replace from '@utils/replace';

import { Layout } from '../../components';
import type { Recipe } from '../../types';
import type { Type } from './Add';
import Form from './Form';

type Props = {
  recipes: Recipe[];
  user: string;
};

type Params = {
  id: string;
};

const Edit: FunctionComponent<Props> = ({ recipes, user }) => {
  const { id } = useParams<Params>();

  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
  const recipe = recipes[recipeIndex];

  const [ingredients, setIngredients] = useState<string[]>(
    get(recipe, 'ingredients', []),
  );
  const [instructions, setInstructions] = useState<string[]>(
    get(recipe, 'instructions', []),
  );
  const [notes, setNotes] = useState<string>(get(recipe, 'notes', ''));
  const [servings, setServings] = useState<number | undefined>(
    get(recipe, 'servings'),
  );
  const [source, setSource] = useState<{ name?: string; url?: string }>(
    get(recipe, 'source', {}),
  );
  const [storage, setStorage] = useState<string>(get(recipe, 'storage', ''));
  const [tags, setTags] = useState<string[]>(get(recipe, 'tags', []));
  const [time, setTime] = useState<{
    prep?: string;
    cook?: string;
    total?: string;
  }>(get(recipe, 'time', {}));
  const [title, setTitle] = useState<string>(get(recipe, 'title', ''));

  const navigate = useNavigate();

  const value = {
    id: paramCase(title),
    ingredients,
    instructions,
    notes,
    servings,
    source,
    storage,
    tags,
    time,
    title,
  };

  const onChange: (value: any, type: Type) => void = (value, type) => {
    const changeMethods = {
      ingredients: setIngredients,
      instructions: setInstructions,
      notes: setNotes,
      servings: setServings,
      source: setSource,
      storage: setStorage,
      tags: setTags,
      time: setTime,
      title: setTitle,
    };

    const setValue = changeMethods[type];
    setValue(value);
  };

  return (
    <Layout header={<BackButton onClick={() => navigate(-1)} />}>
      <Heading marginBottom={majorScale(1)}>Edit {title}</Heading>
      <Form
        value={value}
        onChange={onChange}
        onSubmit={(data) => {
          db.collection('users')
            .doc(user)
            .update({ recipes: replace(recipes, data, recipeIndex) });
          navigate(`/view/${id}`);
        }}
      />
    </Layout>
  );
};

export default Edit;
