import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Table, minorScale } from 'evergreen-ui';

import { Recipe } from '../types';

type Props = {
  recipes: Recipe[]
};

const List: FunctionComponent<Props> = ({ recipes }) => (
  <Table>
    {recipes.map(({ id, tags, title }) => (
      <Table.Row is={Link} key={id} to={`/view/${id}`}>
        <Table.TextCell>{title}</Table.TextCell>
        <Table.Cell justifyContent="flex-end">
          {tags.map((tag, idx) => (
            <Badge color="neutral" key={tag} marginLeft={idx === 0 ? 0 : minorScale(1)}>{tag}</Badge>
          ))}
        </Table.Cell>
      </Table.Row>
    ))}
  </Table>
);

export default List;
