import {
  SideDialog,
  SideDialogHeader,
  SideDialogFooter,
  SideDialogContent,
  SideDialogSection,
  SideDialogFooterGroup,
  SideDialogKeyValueList,
} from '@/components/ui/elements';
import { Button } from '@/components/ui/elements/button';
import { ChevronRightIcon, DatabaseIcon, EditIcon, FileTextIcon, Loader, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';

import { formatDate } from 'date-fns';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type DialogMode = 'view' | 'score' | 'scoring';

type ScoreDialogProps = {
  mode?: DialogMode;
  dataset?: {
    id: string;
    name: string;
  };
  score?: {
    id?: string;
    score?: string;
    reason?: string;
    input?: string;
    output?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  isOpen: boolean;
  onClose?: () => void;
  onNext?: (() => void) | null;
  onPrevious?: (() => void) | null;
  traceId?: string;
};

export function ScoreDialog({
  mode: initialMode = 'view' as DialogMode,
  isOpen,
  score: initialScore,
  onClose,
  onNext,
  onPrevious,
  traceId,
}: ScoreDialogProps) {
  const [score, setScore] = useState(initialScore);
  const [mode, setMode] = useState<DialogMode>(initialMode);
  const [selectedScorer, setSelectedScorer] = useState<string>('');

  const handleScore = () => {
    setMode('scoring');
    setTimeout(() => {
      setScore({
        ...score,
        score: '0.87',
        reason: 'The output is relevant and coherent with the input.',
      });
      setMode('view');
    }, 2000);
  };

  console.log('___>>>', score);

  return (
    <SideDialog dialogTitle="Dataset Item Details" isOpen={isOpen} item={score} onClose={onClose}>
      <SideDialogHeader onNext={onNext} onPrevious={onPrevious} showInnerNav={mode === 'view'}>
        {traceId}
      </SideDialogHeader>

      <SideDialogContent>
        {['score', 'scoring', 'view'].includes(mode) && (
          <>
            <div className="flex items-center justify-between bg-surface5 rounded-lg p-[1.5rem]">
              {mode === 'score' && (
                <div className="flex items-baseline gap-[1rem]">
                  <label
                    htmlFor="select-dataset"
                    className="text-icon3 text-[0.875rem] font-semibold whitespace-nowrap"
                  >
                    Score the trace with:
                  </label>
                  <Select
                    name="select-dataset"
                    value={selectedScorer}
                    defaultValue="1"
                    onValueChange={value => {
                      setSelectedScorer(value);
                    }}
                  >
                    <SelectTrigger id="select-dataset" className="w-full">
                      <SelectValue placeholder="Select a scorer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="1" value="1">
                        My first Scorer
                      </SelectItem>
                      <SelectItem key="2" value="2">
                        My second Scorer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleScore}>Score</Button>
                </div>
              )}

              {mode === 'scoring' && (
                <div className="flex items-center gap-[1rem]">
                  <Loader className="animate-spin text-icon5" />
                  <span className="text-icon3">Scoring...</span>
                </div>
              )}

              {mode === 'view' && (
                <SideDialogKeyValueList
                  items={[
                    {
                      key: 'Score',
                      value: score?.score || 'n/a',
                    },
                    {
                      key: 'Reason',
                      value: score?.reason || 'n/a',
                    },
                    {
                      key: 'Scorer',
                      value: 'My second Scorer',
                    },
                  ]}
                />
              )}
            </div>
            <SideDialogSection>
              <div>
                <h3>Input</h3>
              </div>
              <div className="font-mono text-[0.875rem] text-[#ccc]">
                {score?.input && <MarkdownRenderer>{score.input}</MarkdownRenderer>}
              </div>
            </SideDialogSection>
            <SideDialogSection>
              <div>
                <h3>Output</h3>
              </div>
              <div className="font-mono text-[0.875rem] text-[#ccc]">
                {score?.output && <MarkdownRenderer>{score.output}</MarkdownRenderer>}
              </div>
            </SideDialogSection>
          </>
        )}
      </SideDialogContent>
    </SideDialog>
  );
}
