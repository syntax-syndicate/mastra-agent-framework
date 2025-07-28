import { useAgent } from '@/hooks/use-agents';
import { cn } from '@/lib/utils';
import { EntryList, EntryListPageHeader, MainContentLayout, AgentTraceDialog, AgentIcon } from '@mastra/playground-ui';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useNewTraces } from '@/domains/agents/hooks/use-new-traces';

export default function AgentNewTracesPage() {
  const { agentId } = useParams();
  const { agent, isLoading: isAgentLoading } = useAgent(agentId!);
  const { traces } = useNewTraces(agentId);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [selectedTrace, setSelectedTrace] = useState<any>(null);

  const listColumns = [
    { name: 'input', label: 'Input', size: '1fr' },
    { name: 'output', label: 'Output', size: '1fr' },
    { name: 'createdAt', label: 'Created at', size: '7rem' },
  ];

  const handleOnListItem = (val: any) => {
    if (val.id === selectedTrace?.id) {
      setSelectedTrace(null);
    } else {
      setSelectedTrace(val);
      setDialogIsOpen(true);
    }
  };

  return (
    <>
      <MainContentLayout>
        <div className={cn(`h-full overflow-y-scroll `)}>
          <div className={cn('max-w-[100rem] px-[3rem] mx-auto grid')}>
            <EntryListPageHeader
              title="New Traces"
              description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              icon={<AgentIcon />}
            />
            <EntryList
              items={traces}
              selectedItem={null}
              onItemClick={handleOnListItem}
              columns={listColumns}
              isLoading={false}
            />
          </div>
        </div>
      </MainContentLayout>
      <AgentTraceDialog
        trace={selectedTrace}
        isOpen={dialogIsOpen}
        agent={agent}
        onClose={() => setDialogIsOpen(false)}
      />
    </>
  );
}
