import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, BadgeOwnProps, Button, Pane, Table, minorScale } from 'evergreen-ui';

import { Layout, TagInput } from '../components';
import { Recipe } from '../types';

import { TagContext } from '../App';

type Props = {
  recipes: Recipe[]
};

const COLORS: BadgeOwnProps['color'][] = ['green', 'blue', 'red', 'orange', 'purple', 'yellow', 'teal'];

const List: FunctionComponent<Props> = ({ recipes }) => {
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  return (
    <Layout header={(
      <Pane display="flex" alignItems="flex-end">
        <Pane flex={4}>
          <Button is={Link} to="/add">Add Recipe</Button>
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
    )}>
      <Table>
        <Table.Body>
          {recipes
            .filter(({ tags }) => !tagFilters.length || tagFilters.every((tag) => tags.indexOf(tag) !== -1))
            .sort((a, b) => {
              if (a.id > b.id) {
                return 1;
              } else if (a.id < b.id) {
                return -1;
              }

              return 0;
            })
            .map(({ id, tags, title }) => (
              <Table.Row is={Link} key={id} to={`/view/${id}`}>
                <Table.TextCell>{title}</Table.TextCell>
                <Table.Cell justifyContent="flex-end">
                  {tags.sort().map((tag, idx) => (
                    <Badge
                      color={tagFilters.indexOf(tag) === -1 ? 'neutral' : COLORS[tagFilters.indexOf(tag)]}
                      isSolid={tagFilters.indexOf(tag) !== -1}
                      key={tag}
                      marginLeft={idx === 0 ? 0 : minorScale(1)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Layout>

  );
}

export default List;
