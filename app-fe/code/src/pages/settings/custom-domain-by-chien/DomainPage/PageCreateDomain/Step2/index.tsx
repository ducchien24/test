import { Box, Button, Flex, List, Table, Text } from '@mantine/core';
import { DomainCreate } from '../../type';

interface StepTwoProps {
  prevStep: () => void;
  domainDetail?: DomainCreate;
  onGoToVerifyDomain: () => void;
}
const elements = [
  { position: 6, mass: 12.011, symbol: 'C' },
  { position: 7, mass: 14.007, symbol: 'N' },
  { position: 39, mass: 88.906, symbol: 'Y' },
  { position: 56, mass: 137.33, symbol: 'Ba' },
  { position: 58, mass: 140.12, symbol: 'Ce' },
];
 const Step2 = ({
  domainDetail,
  prevStep,
  onGoToVerifyDomain,
}: StepTwoProps) => {
  const isPublished = domainDetail?.Attributes?.isPublished;
  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <Text variant="body-4">Connect our domain</Text>
        <Text c="#6F6F6F" variant="body-5">
          To connect your domain, you will need to update your domain’s DNS
          settings. This is managed in your domain provider, not in Bitly.
          Follow the step by step instructions below to get started.
        </Text>
      </Flex>
      <Flex direction="column" gap={8}>
        <Text variant="body-4">Instructions</Text>
        <List
          type="ordered"
          size="sm"
          styles={{
            item: {
              marginBottom: 12,
              color: '#6F6F6F',
              fontSize: 14,
              lineHeight: '22px',
              fontWeight: 500,
            },
          }}
        >
          <List.Item>
            In a new window, log in to your domain provider.
          </List.Item>
          <List.Item>
            Locate the DNS settings. This might be under DNS Manager, Manage
            domains, Domain Manager, or something similar.
          </List.Item>
          <List.Item>
            <Flex direction="column" gap={8}>
              {isPublished ? (
                <>
                  <Text variant="body-5">
                    Once you locate the DNS settings, you'll add a CNAME record.
                    You are connecting a subdomain to roo. Adding a CNAME record
                    will create that subdomain. Add a CNAME record with the
                    information below and save it.
                  </Text>
                  <Box
                    p={12}
                    style={{
                      borderRadius: 10,
                      border: '1px solid #BDBDBD',
                      marginRight: 16,
                    }}
                  >
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Type</Table.Th>
                          <Table.Th>CNAME</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {elements.map((element) => (
                          <Table.Tr
                            key={element.position}
                            style={{ border: 'none' }}
                          >
                            <Table.Td>{element.position}</Table.Td>
                            <Table.Td>{element.symbol}</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Box>
                </>
              ) : (
                <>
                  <Text variant="body-5">
                    Once you locate the DNS settings, you'll look for A records.
                    If A records already exist, you can update them to match the
                    information below. If they don't, you'll need to create two
                    A records to match these.
                  </Text>
                  <Box
                    p={12}
                    style={{
                      borderRadius: 10,
                      border: '1px solid #BDBDBD',
                      marginRight: 16,
                    }}
                  >
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Record Type</Table.Th>
                          <Table.Th>Host name</Table.Th>
                          <Table.Th>Value/point to</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {elements.map((element) => (
                          <Table.Tr
                            key={element.position}
                            style={{ border: 'none' }}
                          >
                            <Table.Td>{element.position}</Table.Td>
                            <Table.Td>{element.symbol}</Table.Td>
                            <Table.Td>{element.mass}</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Box>
                </>
              )}
            </Flex>
          </List.Item>
          <List.Item>
            {!isPublished
              ? 'If there are more than two A records, remove all others and leave only the two that you configured above.'
              : 'Confirm that you have entered the CNAME record correctly.'}
          </List.Item>
          <List.Item>
            When you are done, select the Add domain button below.
          </List.Item>
        </List>
      </Flex>

      <Flex align="center" gap={16} justify="flex-end">
        <Button onClick={prevStep} variant="outline">
          Previous
        </Button>
        <Button variant="filled" onClick={onGoToVerifyDomain}>
          Add Domain
        </Button>
      </Flex>
    </Flex>
  );
};
export default Step2