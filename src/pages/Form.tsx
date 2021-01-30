import React, { FormEvent, FunctionComponent } from 'react';
import { Button, Pane, TextareaField, TextInputField, majorScale } from 'evergreen-ui';
import { get } from 'dot-prop';

import ListInput from '../components/ListInput';
import TagInput from '../components/TagInput';
import { TagContext } from '../App';

import { Recipe } from '../types';
import { Type } from './Add';

type Props = {
  value: Recipe,
  onChange: (value: any, type: Type) => void,
  onSubmit: (recipe: Recipe) => void,
}

const Form: FunctionComponent<Props> = ({ value, onChange, onSubmit }) => {
  return (
    <Pane>
      <TextInputField
        label="Title"
        name="recipe-title"
        value={value.title}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value, 'title');
        }}
      />
      <Pane display="flex" alignItems="flex-end">
        <TextInputField
          flex={1}
          description="Name"
          label="Source"
          marginRight={majorScale(1)}
          name="recipe-source-name"
          value={get(value, 'source.name', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.source, name: e.currentTarget.value }, 'source')
          }}
        />
        <TextInputField
          flex={2}
          description="URL"
          label=""
          name="recipe-source-url"
          value={get(value, 'source.url', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.source, url: e.currentTarget.value }, 'source')
          }}
        />
      </Pane>
      <TextInputField
        label="Servings"
        name="recipe-servings"
        type="number"
        value={value.servings}
        width={`${1/3*100}%`}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value ? Number(e.currentTarget.value) : undefined, 'servings')
        }}
      />
      <ListInput
        label="Ingredients"
        value={value.ingredients}
        onChange={(ingredients) => onChange(ingredients, 'ingredients')}
      />
      <ListInput
        label="Instructions"
        textarea
        value={value.instructions}
        onChange={(instructions) => onChange(instructions, 'instructions')}
      />
      <TextareaField
        label="Storage"
        value={value.storage}
        onChange={(e: FormEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value, 'storage')}
      />
      <TextareaField
        label="Notes"
        value={value.notes}
        onChange={(e: FormEvent<HTMLTextAreaElement>) => onChange(e.currentTarget.value, 'notes')}
      />
      <TagContext.Consumer>
        {(tags) => (
          <TagInput
            options={tags}
            value={value.tags}
            onChange={(tags) => onChange(tags, 'tags')}
          />
        )}
      </TagContext.Consumer>
      <Button
        appearance="primary"
        marginTop={majorScale(2)}
        type="submit"
        onClick={(e: FormEvent<HTMLButtonElement>) => {
          e.preventDefault();
          onSubmit(value);
        }}
      >
        Submit
      </Button>
    </Pane>
  )
}

export default Form;
