import React from 'react';
import { Container, Flex, Text, Button, Image } from '@mantine/core';
const PageDomainNoReq = () => {
  return (
    <Container style={{ height: '715px', width: '772px',padding:'32px', border:'none', borderRadius:'4px'}}>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="42px"
        justify="center"
        align="center"
        direction="column"
     >
          <Image src="https://via.placeholder.com/150" alt="Example image" />
         <Flex 
          gap='32px'
          bg="rgba(0, 0, 0, .3)"
          justify="center"
          align="center"
          direction="column"
         >
         <Text size="xl" mt="md">
            Đây là tiêu đề
          </Text>
          <Text size="sm" color="gray" mt="md">
            Đây là văn bản mô tả hoặc nội dung bạn muốn trình bày.
          </Text>
          <Button variant="filled" color="blue" mt="md">
            Nhấn vào đây
          </Button>
         </Flex>
      </Flex>
    </Container>
  );
};

export default PageDomainNoReq;
