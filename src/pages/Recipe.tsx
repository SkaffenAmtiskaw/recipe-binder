import React, { FormEvent, FunctionComponent, KeyboardEvent, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import {
  BackButton,
  Badge,
  Button,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Pane,
  Paragraph,
  Strong,
  Text,
  TextInput,
  Textarea,
  TimeIcon,
  UnorderedList,
  majorScale,
  minorScale,
} from 'evergreen-ui';
import { get } from 'dot-prop';

import db from '@firebase/db';

import { TagContext } from '../App';
import { Layout, TagInput } from '../components';
import type { Recipe as RecipeType } from '../types';

type Props = {
  recipes: RecipeType[],
  user: string,
};

type Params = {
  id: string
};

const Recipe: FunctionComponent<Props> = ({ recipes, user }) => {
  const { id } = useParams<Params>();

  const recipeIndex = recipes.findIndex(recipe => recipe.id === id);
  const recipe = recipes[recipeIndex];

  const [actual, setActual] = useState(get(recipe, 'time.actual', ''));
  const [textarea, setTextarea] = useState(get(recipe, 'notes', ''));

  useEffect(() => {
    setActual(get(recipe, 'time.actual', ''));
    setTextarea(get(recipe, 'notes', ''));
  }, [recipe]);

  const updateRecipe = (value: any, key: string) => {
    db.collection('users')
      .doc(user)
      .update({ recipes: [...recipes.slice(0, recipeIndex), { ...recipe, [key]: value }, ...recipes.slice(recipeIndex + 1)] })

  }

  const history = useHistory();

  return (
    <Layout header={(
      <Pane>
        <BackButton onClick={() => history.goBack()} />
        <Button is={RouterLink} replace to={`/edit/${id}`}>Edit</Button>
      </Pane>
    )}>
      <Heading is="h1">{get(recipe, 'title', '')}</Heading>
      {Object.keys(get(recipe, 'source', {})).length && (
        <Heading size={200}>
          Source: {get(recipe, 'source.url') ?
          <Link href={get(recipe, 'source.url')} rel="noopener noreferrer" target="_blank">{get(recipe, 'source.name', '')}</Link> :
          get(recipe, 'source.name')}
        </Heading>
      )}
      <Pane marginRight={majorScale(4)}>
        {get(recipe, 'tags', []).map((tag, idx) => (
          <Badge color="neutral" key={tag} marginLeft={idx === 0 ? 0 : minorScale(1)} marginTop={majorScale(1)}>{tag}</Badge>
        ))}
      </Pane>
      {!!Object.keys(get(recipe, 'time', {})).length && (
        <Pane display="flex" marginTop={majorScale(1)} marginBottom={minorScale(1)}>
          {get(recipe, 'time.prep', '') && (
            <Pane alignItems="center" display="flex" marginRight={majorScale(4)}>
              <TimeIcon color="muted" marginRight={minorScale(1)} />
              <Text>Prep Time: {get(recipe, 'time.prep')}</Text>
            </Pane>
          )}
          {get(recipe, 'time.cook', '') && (
            <Pane alignItems="center" display="flex" marginRight={majorScale(4)}>
              <TimeIcon color="muted" marginRight={minorScale(1)} />
              <Text>Cook Time: {get(recipe, 'time.cook')}</Text>
            </Pane>
          )}
          {get(recipe, 'time.total', '') && (
            <Pane alignItems="center" display="flex" marginRight={majorScale(4)}>
              <TimeIcon color="muted" marginRight={minorScale(1)} />
              <Strong>Total Time: {get(recipe, 'time.total')}</Strong>
            </Pane>
          )}
          <Pane alignItems="center" display="flex">
            <TimeIcon color="muted" marginRight={minorScale(1)} />
            <Text>Actual Time:
              <TextInput
                marginLeft={minorScale(1)}
                value={actual}
                onChange={(e: FormEvent<HTMLInputElement>) => setActual(e.currentTarget.value)}
                onBlur={() => {
                  if (actual !== get(recipe, 'time.actual', '')) {
                    updateRecipe({ ...get(recipe, 'time', {}), actual }, 'time');
                  }}}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && actual !== get(recipe, 'time.actual', '')) {
                    updateRecipe({ ...get(recipe, 'time', {}), actual }, 'time');
                  }
                }}
              />
            </Text>
          </Pane>
        </Pane>
      )}
      {get(recipe, 'servings', null) && (
        <Text>Servings: {get(recipe, 'servings')}</Text>
      )}
      <Heading marginTop={majorScale(4)} size={400}>Ingredients</Heading>
      <UnorderedList>
      {get(recipe, 'ingredients', []).map((ingredient, idx) => (
        <ListItem key={idx}>{ingredient}</ListItem>
      ))}
      </UnorderedList>
      <Heading marginTop={majorScale(4)} size={400}>Instructions</Heading>
      <OrderedList>
        {get(recipe, 'instructions', []).map((instruction, idx) => (
          <ListItem key={idx}>{instruction}</ListItem>
        ))}
      </OrderedList>
      {get(recipe, 'storage', '') && (
        <>
          <Heading marginTop={majorScale(4)} size={400}>Storage</Heading>
          <Paragraph>{get(recipe, 'storage', '')}</Paragraph>
        </>
      )}
      <Heading marginTop={majorScale(4)} size={400}>Notes</Heading>
      <Textarea
        value={textarea}
        onChange={(e: FormEvent<HTMLTextAreaElement>) => setTextarea(e.currentTarget.value)}
        onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && textarea !== get(recipe, 'notes', '')) {
            updateRecipe(textarea, 'notes');
          }
        }}
      />
      <TagContext.Consumer>
        {(tags) => (
          <TagInput
            options={tags}
            value={get(recipe, 'tags', [])}
            onChange={(array) => updateRecipe(array, 'tags')}
          />
        )}
      </TagContext.Consumer>
    </Layout>

  );
};

export default Recipe;
