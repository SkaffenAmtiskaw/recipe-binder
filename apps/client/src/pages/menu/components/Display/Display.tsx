import {
  Button,
  Heading,
  Pane,
  Link as StyledLink,
  Text,
  majorScale,
  minorScale,
} from 'evergreen-ui';
import { Link } from 'react-router-dom';

import { getWeekday } from '../../utils';

import type { Day, Dish } from '../../types';

type Props = {
  date: Date;
  menu: Day[];
  onEdit: () => void;
};

const Display = ({ date, menu, onEdit }: Props) => {
  const getLink = (dish: Dish) => {
    if (dish.source?.[0] === '/') {
      return (
        <StyledLink flex={1} is={Link} to={dish.source}>
          {dish.name}
        </StyledLink>
      );
    }

    return (
      <StyledLink flex={1} href={dish.source}>
        {dish.name}
      </StyledLink>
    );
  };

  return (
    <Pane display="flex" flexDirection="column">
      {menu.map((value, index) => {
        const weekday = getWeekday.format(
          new Date(date).setDate(date.getDate() + index),
        );

        return (
          <Pane key={weekday} marginBottom={majorScale(1)}>
            <Pane background="tint1" padding={majorScale(1)} width="100%">
              <Heading size={400}>{weekday}</Heading>
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
        );
      })}
      <Button appearance="default" width="max-content" onClick={onEdit}>
        Edit
      </Button>
    </Pane>
  );
};

export default Display;
