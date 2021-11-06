import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Button,
  ChevronRightIcon,
  ChevronLeftIcon,
  Heading,
  IconButton,
  Link as LinkStyle,
  Pane,
  Text,
  majorScale,
  minorScale,
} from 'evergreen-ui';

import { Layout } from '../../components';

type Dish = {
  name: string;
  source?: string;
  note?: string;
};

type Meal = {
  food: Dish[];
  title: string;
  subtitle?: string;
};

type Day = {
  meals: Meal[];
  note?: string;
};

type Props = {
  user: string;
  menus: Record<string, Day[]>;
};

const getMonday = (date: Date) => {
  const day = date.getDay();

  const diff = date.getDate() - day + 1;

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

  useEffect(() => {
    history.replace(`/meal-plan/${getISODate(date)}`);
  }, [date]);

  const menu = menus[getISODate(date)] || [];

  const weekday = new Intl.DateTimeFormat('en-us', { weekday: 'long' });

  const getLink = (dish: Dish) => {
    if (dish.source?.[0] === '/') {
      return (
        <LinkStyle flex={1} is={Link} to={dish.source}>
          {dish.name}
        </LinkStyle>
      );
    }

    return (
      <LinkStyle flex={1} href={dish.source}>
        {dish.name}
      </LinkStyle>
    );
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
      <Pane display="flex" flexDirection="column">
        {menu.map((value, index) => (
          <Pane
            key={weekday.format(new Date(date).setDate(date.getDate() + index))}
            marginBottom={majorScale(1)}
          >
            <Pane background="tint1" padding={majorScale(1)} width="100%">
              <Heading size={400}>
                {weekday.format(new Date(date).setDate(date.getDate() + index))}
              </Heading>
            </Pane>
            {value.meals.map((meal, mealIndex) => (
              <Pane
                key={meal.title}
                display="flex"
                width="100%"
                borderTop={mealIndex === 0 ? '' : '1px solid #E6E8F0'}
                paddingY={minorScale(1)}
                paddingX={majorScale(1)}
              >
                <Pane flex={1}>
                  <Heading size={300}>{meal.title}</Heading>
                  <Text>{meal.subtitle}</Text>
                </Pane>
                <Pane flex={5}>
                  {meal.food.map((dish) => (
                    <Pane key={dish.name}>
                      <Pane display="flex">
                        {!!dish.source ? (
                          getLink(dish)
                        ) : (
                          <Text flex={1}>{dish.name}</Text>
                        )}
                        <Text flex={3}>{dish.note}</Text>
                      </Pane>
                    </Pane>
                  ))}
                </Pane>
              </Pane>
            ))}
          </Pane>
        ))}
      </Pane>
    </Layout>
  );
};

export default Menu;
