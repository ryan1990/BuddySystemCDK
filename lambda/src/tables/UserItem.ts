import {
    attribute,
    autoGeneratedHashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('Users')
export class UserItem {
    @autoGeneratedHashKey()
    user: string;

    @attribute()
    value: string;
}
