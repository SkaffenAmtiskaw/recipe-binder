import {
  Badge,
  Button,
  majorScale,
  minorScale,
  Pane,
  Paragraph,
  SearchInput,
  Table,
  Text,
} from 'evergreen-ui';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { BadgeOwnProps } from 'evergreen-ui';
import type { ChangeEvent, FunctionComponent } from 'react';

import { Layout, TagInput } from '../../components';
import type { Recipe } from '../../types';

import { TagContext } from '../../App';

type Props = {
  recipes: Recipe[];
};

const COLORS: BadgeOwnProps['color'][] = [
  'green',
  'blue',
  'red',
  'orange',
  'purple',
  'yellow',
  'teal',
];

const List: FunctionComponent<Props> = ({ recipes }) => {
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  return (
    <Layout
      header={
        <Pane display="flex" alignItems="flex-end">
          <Pane flex={3}>
            <Button is={Link} to="/meal-plan" marginRight={minorScale(1)}>
              Meal Plan
            </Button>
            <Button is={Link} to="/add">
              Add Recipe
            </Button>
          </Pane>
          <Pane flex={1} marginRight={majorScale(1)}>
            <SearchInput
              value={search}
              onChange={(e: ChangeEvent) => {
                const element = e.currentTarget as HTMLInputElement;
                setSearch(element.value);
              }}
            />
          </Pane>
          <Pane flex={1}>
            <TagContext.Consumer>
              {(tags) => (
                <TagInput
                  description="Filter Tags"
                  max={COLORS.length}
                  restrict
                  options={tags}
                  tagProps={(value: any, idx: any) => ({ color: COLORS[idx] })}
                  value={tagFilters}
                  onChange={setTagFilters}
                />
              )}
            </TagContext.Consumer>
          </Pane>
        </Pane>
      }
    >
      <Table>
        <Table.Body>
          {recipes
            .filter(
              ({ title, ingredients }) =>
                !search ||
                title.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
                ingredients.some(
                  (ingredient) =>
                    ingredient.toUpperCase().indexOf(search.toUpperCase()) !==
                    -1,
                ),
            )
            .filter(
              ({ tags }) =>
                !tagFilters.length ||
                tagFilters.every((tag) => tags.indexOf(tag) !== -1),
            )
            .sort((a, b) => {
              if (search) {
                if (
                  a.title.toUpperCase().indexOf(search.toUpperCase()) !== -1 &&
                  b.title.toUpperCase().indexOf(search.toUpperCase()) === -1
                ) {
                  return -1;
                } else if (
                  a.title.toUpperCase().indexOf(search.toUpperCase()) === -1 &&
                  b.title.toUpperCase().indexOf(search.toUpperCase()) !== -1
                ) {
                  return 1;
                }
              }
              if (a.id > b.id) {
                return 1;
              } else if (a.id < b.id) {
                return -1;
              }

              return 0;
            })
            .map(({ id, ingredients, tags, title }) => {
              const titleIndex = title
                .toUpperCase()
                .indexOf(search.toUpperCase());
              const ingredientMatch =
                ingredients.find(
                  (ingredient) =>
                    ingredient.toUpperCase().indexOf(search.toUpperCase()) !==
                    -1,
                ) || '';
              const ingredientIndex = ingredientMatch
                .toUpperCase()
                .indexOf(search.toUpperCase());

              return (
                <Table.Row is={Link} key={id} to={`/view/${id}`}>
                  {search ? (
                    titleIndex === -1 ? (
                      <Table.Cell
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Paragraph>{title}</Paragraph>
                        <Paragraph>
                          <Text size={300} whiteSpace="pre">
                            {ingredientMatch.substring(0, ingredientIndex)}
                          </Text>
                          <Text
                            color="blue"
                            size={300}
                            textDecoration="underline dotted"
                            whiteSpace="pre"
                          >
                            {ingredientMatch.substring(
                              ingredientIndex,
                              ingredientIndex + search.length,
                            )}
                          </Text>
                          <Text size={300} whiteSpace="pre">
                            {ingredientMatch.substring(
                              ingredientIndex + search.length,
                            )}
                          </Text>
                        </Paragraph>
                      </Table.Cell>
                    ) : (
                      <Table.Cell>
                        <Text whiteSpace="pre">
                          {title.substring(0, titleIndex)}
                        </Text>
                        <Text
                          color="blue"
                          textDecoration="underline dotted"
                          whiteSpace="pre"
                        >
                          {title.substring(
                            titleIndex,
                            titleIndex + search.length,
                          )}
                        </Text>
                        <Text whiteSpace="pre">
                          {title.substring(titleIndex + search.length)}
                        </Text>
                      </Table.Cell>
                    )
                  ) : (
                    <Table.TextCell>{title}</Table.TextCell>
                  )}
                  <Table.Cell flex={2} justifyContent="flex-end">
                    {tags.sort().map((tag, idx) => (
                      <Badge
                        color={
                          tagFilters.indexOf(tag) === -1
                            ? 'neutral'
                            : COLORS[tagFilters.indexOf(tag)]
                        }
                        key={tag}
                        marginLeft={idx === 0 ? 0 : minorScale(1)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </Layout>
  );
};

export default List;
