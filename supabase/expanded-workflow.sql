alter table public.client_requests
  drop constraint if exists client_requests_status_check;

alter table public.client_requests
  add constraint client_requests_status_check
  check (status in (
    'Received',
    'Under Review',
    'Proposal Sent',
    'Confirmed',
    'Team Assigned',
    'Operation Active',
    'Completed'
  ));
