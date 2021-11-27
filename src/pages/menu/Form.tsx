import React, { FormEvent, KeyboardEvent, useState } from 'react';
import {
  Button,
  Heading,
  Pane,
  PlusIcon,
  TextInputField,
  TextareaField,
  majorScale,
  minorScale,
} from 'evergreen-ui';
import { klona } from 'klona';

import dotProp from 'dot-prop';

import replace from '../../utils/replace';

import weekdayFormat from './weekdayFormat';

import type { Day } from './Menu';

type KeyDownEvent = KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>

type Props = {
  date: Date;
  menu: Day[];
  onCancel: () => void;
  onDelete: () => void;
  onSubmit: (data: Day[]) => void;
};

const Form = ({ date, menu, onCancel, onDelete, onSubmit }: Props) => {
  const [data, setData] = useState<Day[]>(
    !!menu.length ? klona(menu) : Array(7).fill({ meals: [] }),
  );

  const addMeal = (day: Day, index: number) => {
    const value = { ...day, meals: [...day.meals, { food: [] }] };

    setData((state) => replace(state, value, index));
  };

  const editValue = (value: unknown, path: string) => {
    setData((state) => dotProp.set([...state], path, value));
  };

  const deleteValue = (path: string) => () => {
    setData((state) => {
      const value = [...state]
      dotProp.delete(value, path);
      return value;
    });
  }

  const onKeyEvent = (key: string, modifier: boolean) => (callback: (e: KeyDownEvent) => void) => (e: KeyDownEvent) => {
    if (key === e.key.toLowerCase() && (e.metaKey || e.ctrlKey) === modifier) {
      e.preventDefault();
      callback(e);
    }
  }

  const onCtrlD = onKeyEvent('d', true);

  return (
    <Pane display="flex" flexDirection="column">
      {data.map((value, weekday) => (
        <Pane
          key={weekdayFormat.format(
            new Date(date).setDate(date.getDate() + weekday),
          )}
          marginBottom={majorScale(1)}
        >
          <Pane background="tint1" padding={majorScale(1)} width="100%">
            <Heading size={400}>
              {weekdayFormat.format(
                new Date(date).setDate(date.getDate() + weekday),
              )}
            </Heading>
          </Pane>
          <Pane padding={majorScale(1)}>
            {value.meals.map((meal, index) => (
              <Pane
                display="grid"
                gridTemplateAreas={`'title food food food' 'subtitle food food food'`}
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gridTemplateRows="max-content 1fr"
                gridColumnGap={majorScale(1)}
                key={`meal-${value}-${index}`}
                paddingY={majorScale(1)}
                borderBottom="1px dotted #E6E8F0"
              >
                <TextInputField
                  gridArea="title"
                  label="Meal"
                  value={meal.title}
                  marginTop={!!meal.food.length ? 21 : 0}
                  marginBottom={minorScale(1) + (!!meal.food.length ? 1 : 0)}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    editValue(
                      e.currentTarget.value,
                      `${weekday}.meals.${index}.title`,
                    )
                  }
                  onKeyDown={onCtrlD(deleteValue(`${weekday}.meals.${index}`) as (e: KeyDownEvent) => void)}
                />
                <TextInputField
                  gridArea="subtitle"
                  label="Description"
                  value={meal.subtitle}
                  marginBottom={minorScale(1)}
                  onChange={(e: FormEvent<HTMLInputElement>) =>
                    editValue(
                      e.currentTarget.value,
                      `${weekday}.meals.${index}.subtitle`,
                    )
                  }
                  onKeyDown={onCtrlD(deleteValue(`${weekday}.meals.${index}`) as (e: KeyDownEvent) => void)}
                />
                <Pane gridArea="food" paddingLeft={minorScale(1)} marginLeft={minorScale(-1)} borderLeft="1px dotted #E6E8F0">
                  {meal.food.map((dish, foodIndex) => (
                    <Pane alignItems="start" display="grid" gridTemplateColumns="1fr 1fr 1fr" gridColumnGap={minorScale(1)} key={`dish-${weekday}-${index}-${foodIndex}`}>
                      <TextInputField
                        description="Name"
                        label={foodIndex === 0 ? 'Food' : ''}
                        key={`${weekday}-${index}-${foodIndex}-name`}
                        value={dish.name}
                        marginBottom={minorScale(1)}
                        onChange={(e: FormEvent<HTMLInputElement>) =>
                          editValue(
                            e.currentTarget.value,
                            `${weekday}.meals.${index}.food.${foodIndex}.name`,
                          )
                        }
                        onKeyDown={onCtrlD(deleteValue(`${weekday}.meals.${index}.food.${foodIndex}`)  as (e: KeyDownEvent) => void)}
                      />
                      <TextInputField
                        description="Source"
                        label=""
                        key={`${weekday}-${index}-${foodIndex}-source`}
                        value={dish.source}
                        marginTop={foodIndex === 0 ? 21 : 0}
                        marginBottom={minorScale(1)}
                        onChange={(e: FormEvent<HTMLInputElement>) =>
                          editValue(
                            e.currentTarget.value,
                            `${weekday}.meals.${index}.food.${foodIndex}.source`,
                          )
                        }
                        onKeyDown={onCtrlD(deleteValue(`${weekday}.meals.${index}.food.${foodIndex}`)  as (e: KeyDownEvent) => void)}
                      />
                      <TextareaField
                        description="Note"
                        label=""
                        key={`${weekday}-${index}-${foodIndex}-note`}
                        value={dish.note}
                        marginTop={foodIndex === 0 ? 21 : 0}
                        marginBottom={minorScale(1)}
                        onChange={(e: FormEvent<HTMLTextAreaElement>) =>
                          editValue(
                            e.currentTarget.value,
                            `${weekday}.meals.${index}.food.${foodIndex}.note`,
                          )
                        }
                        onKeyDown={onCtrlD(deleteValue(`${weekday}.meals.${index}.food.${foodIndex}`)  as (e: KeyDownEvent) => void)}
                      />
                    </Pane>
                  ))}
                  <Button appearance="minimal" iconBefore={PlusIcon} onClick={() => editValue({}, `${weekday}.meals.${index}.food.${meal.food.length}`)}>
                    Add Dish
                  </Button>
                </Pane>
              </Pane>
            ))}
            <Button
              appearance="minimal"
              iconBefore={PlusIcon}
              onClick={() => addMeal(value, weekday)}
            >
              Add Meal
            </Button>
          </Pane>
        </Pane>
      ))}
      <Pane display="flex" justifyContent="space-between">
        <Pane>
          <Button appearance="primary" marginRight={majorScale(1)} width="max-content" onClick={() => onSubmit(data)}>Save</Button>
          {
            !!menu.length && (
              <Button appearance="default" width="max-content" onClick={onCancel}>Cancel</Button>
            )
          }
        </Pane>
        {
          !!menu.length && (
            <Button appearance="minimal" intent="danger" onClick={onDelete}>Delete</Button>
          )
        }
      </Pane>
    </Pane>
  );
};

export default Form;
