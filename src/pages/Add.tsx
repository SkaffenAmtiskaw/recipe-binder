import React, { FunctionComponent, useState } from 'react';
import { Heading, Pane, majorScale } from 'evergreen-ui';
import { paramCase } from 'param-case';

import Form from './Form';

import { Recipe } from '../types';
import db from '../firebase';

type Props = {
  recipes: Recipe[],
  user: string,
};

export type Type = 'ingredients' | 'instructions' | 'notes' | 'servings' | 'source' | 'storage' | 'tags' | 'title';

const Add: FunctionComponent<Props> = ({ recipes, user }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [servings, setServings] = useState<number>();
  const [source, setSource] = useState<{ name?: string, url?: string }>({});
  const [storage, setStorage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');

  const value = { id: paramCase(title), ingredients, instructions, notes, servings, source, storage, tags, title };

  const onChange: (value: any, type: Type) => void = (value, type) => {
    const changeMethods = {
      ingredients: setIngredients,
      instructions: setInstructions,
      notes: setNotes,
      servings: setServings,
      source: setSource,
      storage: setStorage,
      tags: setTags,
      title: setTitle,
    };

    const setValue = changeMethods[type];
    setValue(value);
  }


  return (
    <Pane>
      <Heading marginBottom={majorScale(1)}>Add Recipe</Heading>
      <Form
        value={value}
        onChange={onChange}
        onSubmit={(data) => {
          db.collection('users')
            .doc(user)
            .set({ recipes: { ...recipes, [paramCase(data.title)]: data }})
        }}
      />
    </Pane>
  );
}

export default Add;
