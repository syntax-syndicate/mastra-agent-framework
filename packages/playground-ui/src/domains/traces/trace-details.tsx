import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { DatasetItemDialog } from '@/domains/datasets';
import { ScoreDialog } from '@/domains/scorers';

import { Button } from '@/ds/components/Button';

import { TraceContext } from './context/trace-context';
import SpanView from './trace-span-view';
import { Txt } from '@/ds/components/Txt';

import { Icon } from '@/ds/icons';
import { Header } from '@/ds/components/Header';
import { Badge } from '@/ds/components/Badge';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';

export function TraceDetails() {
  const { trace, currentTraceIndex, prevTrace, nextTrace, traces } = useContext(TraceContext);
  const [datasetDialogIsOpen, setDatasetDialogIsOpen] = useState<boolean>(false);
  const [scoreDialogIsOpen, setScoreDialogIsOpen] = useState<boolean>(false);

  const actualTrace = traces[currentTraceIndex];

  if (!actualTrace || !trace) return null;

  const hasFailure = trace.some(span => span.status.code !== 0);

  console.log(
    '-->>',
    trace.find(span => span.name === 'ai.streamText'),
  );

  const aiTrace = trace.find(span => span.name === 'ai.streamText');
  const tracePrompts = aiTrace?.attributes?.['ai.prompt'] || '{}';
  const tracePromptsObj = JSON.parse(tracePrompts as string) || {};
  const traceInput = tracePromptsObj.messages.find((msg: any) => msg.role === 'user')?.content?.[0]?.['text'] || '';
  const traceOutput = aiTrace?.attributes?.['ai.response.text'] || '';
  const traceId = aiTrace?.traceId || '';

  return (
    <>
      <aside>
        <Header>
          <div className="flex items-center gap-1">
            <Button className="bg-transparent border-none" onClick={prevTrace} disabled={currentTraceIndex === 0}>
              <Icon>
                <ChevronUp />
              </Icon>
            </Button>
            <Button
              className="bg-transparent border-none"
              onClick={nextTrace}
              disabled={currentTraceIndex === traces.length - 1}
            >
              <Icon>
                <ChevronDown />
              </Icon>
            </Button>
          </div>
          <div className="flex items-center gap-1 justify-between w-full">
            <Txt variant="ui-lg" className="font-medium text-icon5 shrink-0">
              Trace <span className="ml-2 text-icon3">{actualTrace.traceId.substring(0, 7)}</span>
            </Txt>

            {hasFailure && (
              <Badge variant="error" icon={<X />}>
                Failed
              </Badge>
            )}
          </div>

          <Button onClick={() => setScoreDialogIsOpen(true)}>Score</Button>
          <Button onClick={() => setDatasetDialogIsOpen(true)}>Save</Button>
        </Header>

        <div className="p-5">
          <SpanView trace={trace} />
        </div>
      </aside>
      <DatasetItemDialog
        initialMode="save"
        isOpen={datasetDialogIsOpen}
        item={{
          input: traceInput,
          output: traceOutput as string,
        }}
        onClose={() => setDatasetDialogIsOpen(false)}
        traceId={traceId}
      />
      <ScoreDialog
        mode="score"
        isOpen={scoreDialogIsOpen}
        score={{
          input: traceInput,
          output: traceOutput as string,
        }}
        onClose={() => setScoreDialogIsOpen(false)}
        traceId={traceId}
      />
    </>
  );
}
