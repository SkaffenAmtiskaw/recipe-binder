import { get } from 'dot-prop';
import {
  Button,
  majorScale,
  Pane,
  TextareaField,
  TextInputField,
} from 'evergreen-ui';
import { FormEvent, FunctionComponent } from 'react';

import { TagContext } from '../../App';
import { ListInput, TagInput } from '../../components';

import type { Recipe } from '../../types';
import type { Type } from './Add';

type Props = {
  value: Recipe;
  onChange: (value: any, type: Type) => void;
  onSubmit: (recipe: Recipe) => void;
};

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
            onChange(
              { ...value.source, name: e.currentTarget.value },
              'source',
            );
          }}
        />
        <TextInputField
          flex={2}
          description="URL"
          label=""
          name="recipe-source-url"
          value={get(value, 'source.url', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.source, url: e.currentTarget.value }, 'source');
          }}
        />
      </Pane>
      <Pane display="flex" alignItems="flex-end">
        <TextInputField
          flex={1}
          description="Prep"
          label="Time"
          marginRight={majorScale(1)}
          name="recipe-prep-time"
          value={get(value, 'time.prep', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.time, prep: e.currentTarget.value }, 'time');
          }}
        />
        <TextInputField
          flex={1}
          description="Cook"
          label=""
          marginRight={majorScale(1)}
          name="recipe-cook-time"
          value={get(value, 'time.cook', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.time, cook: e.currentTarget.value }, 'time');
          }}
        />
        <TextInputField
          flex={1}
          description="Total"
          label=""
          marginRight={majorScale(1)}
          name="recipe-total-time"
          value={get(value, 'time.total', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.time, total: e.currentTarget.value }, 'time');
          }}
        />
        <TextInputField
          flex={1}
          description="Actual"
          label=""
          name="recipe-actual-time"
          value={get(value, 'time.actual', '')}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange({ ...value.time, actual: e.currentTarget.value }, 'time');
          }}
        />
      </Pane>
      <TextInputField
        label="Servings"
        name="recipe-servings"
        type="number"
        value={value.servings}
        width={`${(1 / 3) * 100}%`}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          onChange(
            e.currentTarget.value ? Number(e.currentTarget.value) : undefined,
            'servings',
          );
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
        onChange={(e: FormEvent<HTMLTextAreaElement>) =>
          onChange(e.currentTarget.value, 'storage')
        }
      />
      <TextareaField
        label="Notes"
        value={value.notes}
        onChange={(e: FormEvent<HTMLTextAreaElement>) =>
          onChange(e.currentTarget.value, 'notes')
        }
      />
      <TagContext.Consumer>
        {(tags) => (
          <TagInput
            label="Tags"
            options={tags}
            value={value.tags}
            onChange={(array) => onChange(array, 'tags')}
          />
        )}
      </TagContext.Consumer>
      <Button
        appearance="primary"
        marginTop={majorScale(2)}
        type="submit"
        onClick={(e: FormEvent<HTMLButtonElement>) => {
          /**
           * Prevent the recipe from not being added if the value is undefined. If there are more possible
           * undefined values this can be changed to a forEach on Object.keys
           */
          if (!value.servings) {
            delete value.servings;
          }

          e.preventDefault();
          onSubmit(value);
        }}
      >
        Submit
      </Button>
    </Pane>
  );
};

export default Form;
