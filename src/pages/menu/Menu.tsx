import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import dotProp from 'dot-prop';
import {
  Button,
  ChevronRightIcon,
  ChevronLeftIcon,
  Heading,
  IconButton,
  Pane,
  majorScale,
} from 'evergreen-ui';

import db from '@firebase/db';

import Display from './Display';
import Form from './Form';

import { Layout } from '../../components';

export type Dish = {
  name: string;
  source?: string;
  note?: string;
};

export type Meal = {
  food: Dish[];
  title: string;
  subtitle?: string;
};

export type Day = {
  meals: Meal[];
  note?: string;
};

type Props = {
  user: string;
  menus: Record<string, Day[]>;
};

const getMonday = (date: Date) => {
  const day = date.getDay();

  const diff = date.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
};

const getISODate = (date: Date) =>
  `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2,
  )}-${`0${date.getDate()}`.slice(-2)}`;

const goForward = (date: Date) => new Date(date.setDate(date.getDate() + 7));

const goBack = (date: Date) => new Date(date.setDate(date.getDate() - 7));

const Menu = ({ menus, user }: Props) => {
  const history = useHistory();

  const { date: params } = useParams<{ date?: string }>();

  const [date, setDate] = useState(
    getMonday(params ? new Date(params) : new Date()),
  );

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    history.replace(`/meal-plan/${getISODate(date)}`);
  }, [date]);

  const menu: Day[] = menus[getISODate(date)] || [];

  const onSubmit = (data: Day[]) => {
    db.collection('users')
      .doc(user)
      .update({ 'meal_plans': {...menus, [getISODate(date)]: data } });
    setEdit(false);
  }

  const onDelete = () => {
    const data = {...menus};

    dotProp.delete(data, getISODate(date));

    db.collection('users')
      .doc(user)
      .update({ 'meal_plans': data });
  }

  return (
    <Layout
      header={
        <Button is={Link} to="/list">
          Recipe List
        </Button>
      }
    >
      <Pane display="flex" alignItems="center">
        <Heading flex={1} marginBottom={majorScale(1)} size={500}>
          Plan Meals
        </Heading>
        <Pane flex={4} display="flex" alignItems="center">
          <IconButton
            appearance="minimal"
            icon={ChevronLeftIcon}
            onClick={() => setDate(goBack(date))}
          />
          <Heading size={400}>
            Week of {new Intl.DateTimeFormat('en-us').format(date)}
          </Heading>
          <IconButton
            appearance="minimal"
            icon={ChevronRightIcon}
            onClick={() => setDate(goForward(date))}
          />
        </Pane>
      </Pane>
      {!!menu.filter((v) => !!v).length && !edit ? (
        <Display date={date} menu={menu} onEdit={() => setEdit(true)} />
      ) : (
        <Form date={date} menu={menu} onCancel={() => setEdit(false)} onDelete={onDelete} onSubmit={onSubmit} />
      )}
    </Layout>
  );
};

export default Menu;
