# API SPECIFICATIONS

## Endpoint Pubblici

### 1. Inserimento Lead (Contact Form)
Endpoint dedicato alla ricezione sicura di nuove richieste dal frontend. Nessun API di tracciamento o analytics verrà invocata.

* **URL:** `/api/v1/contact`
* **Method:** `POST`
* **Rate Limiting:** 5 richieste al minuto per indirizzo IP.

**Request Body (JSON):**
```json
{
  "nome": "Mario Rossi",
  "email": "mario.rossi@example.com",
  "telefono": "+393331234567",
  "tipo_richiesta": "Preventivo Restyling",
  "messaggio": "Salve, vorrei avere maggiori informazioni...",
  "recaptcha_token": "token_generato_dal_frontend"
}
```

**Validazione e Sicurezza:**
* `nome`: Obbligatorio, string, max 150 caratteri, protetto da XSS.
* `email`: Obbligatorio, validazione formato email RFC, max 150 caratteri.
* `telefono`: Opzionale, string, max 50 caratteri.
* `tipo_richiesta`: Obbligatorio, string, whitelist di opzioni predefinite.
* `messaggio`: Obbligatorio, testuale, protetto da XSS.
* `recaptcha_token`: Obbligatorio. Validazione backend con Google reCAPTCHA v3. La richiesta verrà respinta in caso di score inferiore a 0.5.
* **Sanitizzazione:** Tutte le stringhe vengono passate attraverso funzioni di strip_tags prima dell'inserimento in DB.

**Response (Success - 201 Created):**
```json
{
  "status": "success",
  "message": "Richiesta ricevuta correttamente. Il nostro team ti contatterà al più presto."
}
```

**Response (Error - 422 Unprocessable Entity):**
```json
{
  "status": "error",
  "errors": {
    "email": ["Il formato dell'email non è valido."]
  }
}
```

## Endpoint Protetti (Admin CRM)

*Gli endpoint seguenti richiedono header `Authorization: Bearer <token>` ottenuto tramite Laravel Sanctum.*

### 2. Lettura Contacts
* **URL:** `/api/v1/admin/contacts`
* **Method:** `GET`
* **Scopo:** Restituisce la lista paginata dei lead, ordinati per `created_at` DESC. Serve al CRM per consultazione.

### 3. Aggiornamento Stato Lead
* **URL:** `/api/v1/admin/contacts/{id}`
* **Method:** `PATCH`
* **Scopo:** Aggiorna lo stato (`stato_gestione`) e le note (`note_admin`) interne del contatto.

**Request Body (JSON):**
```json
{
  "stato_gestione": "in_lavorazione",
  "note_admin": "Chiamato il cliente, attende preventivo."
}
```
