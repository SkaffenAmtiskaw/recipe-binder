import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BackButton, Heading, majorScale } from 'evergreen-ui';
import { paramCase } from 'param-case';

import db from '@firebase/db';

import Form from './Form';

import { Layout } from '../../components';
import type { Recipe } from '../../types';

type Props = {
  recipes: Recipe[];
  user: string;
};

export type Type =
  | 'ingredients'
  | 'instructions'
  | 'notes'
  | 'servings'
  | 'source'
  | 'storage'
  | 'tags'
  | 'time'
  | 'title';

const Add: FunctionComponent<Props> = ({ recipes, user }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [servings, setServings] = useState<number>();
  const [source, setSource] = useState<{ name?: string; url?: string }>({});
  const [storage, setStorage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [time, setTime] = useState<{
    prep?: string;
    cook?: string;
    total?: string;
  }>({});
  const [title, setTitle] = useState<string>('');

  const history = useHistory();

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
    <Layout header={<BackButton onClick={() => history.goBack()} />}>
      <Heading marginBottom={majorScale(1)}>Add Recipe</Heading>
      <Form
        value={value}
        onChange={onChange}
        onSubmit={(data) => {
          db.collection('users')
            .doc(user)
            .update({
              recipes: [...recipes, { ...data, id: paramCase(data.title) }],
            });
          history.push('/list');
        }}
      />
    </Layout>
  );
};

export default Add;
