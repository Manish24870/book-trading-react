import { useEffect, useMemo, useState } from "react";
import { Card, Text, Flex, Box } from "@mantine/core";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = ({ deadline = new Date().toString() }) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(parsedDeadline - Date.now()), 1000);

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <Box mt={30} mb={70}>
      <Text align="center" size="lg" weight={500}>
        The auction will start in
      </Text>
      <Flex justify="center" gap={30} mt={20}>
        {Object.entries({
          Days: time / DAY,
          Hours: (time / HOUR) % 24,
          Minutes: (time / MINUTE) % 60,
          Seconds: (time / SECOND) % 60,
        }).map(([label, value]) => (
          <Card withBorder shadow="xl">
            <Text align="center" weight={600} size="xl" color="primary">
              {`${Math.floor(value)}`.padStart(2, "0")}
            </Text>
            <Text align="center">{label}</Text>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default Timer;