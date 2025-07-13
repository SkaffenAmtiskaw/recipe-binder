import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import dotProp from 'dot-prop';
import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heading,
  IconButton,
  majorScale,
  Pane,
} from 'evergreen-ui';

import db from '@firebase/db';

import { Display, Form } from './components';

import {
  getISODate,
  getNextWeek,
  getPreviousWeek,
  getStartOfWeek,
} from './utils';

import { Layout } from '../../components';

import type { Day } from './types';

type Props = {
  user: string;
  menus: Record<string, Day[]>;
};

const Menu = ({ menus, user }: Props) => {
  const navigate = useNavigate();

  const { date: params } = useParams<{ date?: string }>();

  const [date, setDate] = useState(
    getStartOfWeek(params ? new Date(`${params}T00:00`) : new Date()),
  );

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    navigate(`/meal-plan/${getISODate(date)}`, { replace: true });
  }, [date]);

  const menu: Day[] = menus[getISODate(date)] || [];

  const onSubmit = (data: Day[]) => {
    db.collection('users')
      .doc(user)
      .update({ meal_plans: { ...menus, [getISODate(date)]: data } });
    setEdit(false);
  };

  const onDelete = () => {
    const data = { ...menus };

    dotProp.delete(data, getISODate(date));

    db.collection('users').doc(user).update({ meal_plans: data });
  };

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
            onClick={() => setDate(getPreviousWeek(date))}
          />
          <Heading size={400}>
            Week of {new Intl.DateTimeFormat('en-us').format(date)}
          </Heading>
          <IconButton
            appearance="minimal"
            icon={ChevronRightIcon}
            onClick={() => setDate(getNextWeek(date))}
          />
        </Pane>
      </Pane>
      {!!menu.filter((v) => !!v).length && !edit ? (
        <Display date={date} menu={menu} onEdit={() => setEdit(true)} />
      ) : (
        <Form
          date={date}
          menu={menu}
          onCancel={() => setEdit(false)}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      )}
    </Layout>
  );
};

export default Menu;
