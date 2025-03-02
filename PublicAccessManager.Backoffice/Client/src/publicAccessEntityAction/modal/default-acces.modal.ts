﻿import {UmbModalBaseElement} from "@umbraco-cms/backoffice/modal";
import {DefaultAccessModalData, DefaultAccessModalValue} from "./public-acess-modal.token.ts";
import {DefaultAccessRepository} from "../repository/default-access.repository.ts";
import {css, customElement, html, nothing, state} from "@umbraco-cms/backoffice/external/lit";
import {UmbDocumentItemRepository, UmbInputDocumentElement} from "@umbraco-cms/backoffice/document";
import {UmbInputMemberGroupElement, UmbMemberGroupItemRepository} from "@umbraco-cms/backoffice/member-group";
import {PublicAccessRequestModel} from "@umbraco-cms/backoffice/external/backend-api";
import {UmbInputMemberElement, UmbMemberDetailRepository} from "@umbraco-cms/backoffice/member";
import {UUIRadioEvent} from "@umbraco-cms/backoffice/external/uui";
import {UmbTextStyles} from "@umbraco-cms/backoffice/style";

@customElement("umb-default-access-modal")
export class DefaultAccessModal extends UmbModalBaseElement<DefaultAccessModalData, DefaultAccessModalValue> {
    #repo = new DefaultAccessRepository(this);

    #unique?: string;
    #isNew: boolean = true;

    @state()
    private _documentName = '';

    @state()
    private _specific?: boolean;

    @state()
    private _startPage = true;

    @state()
    private _selection: Array<string> = [];

    @state()
    private _loginDocumentId?: string;

    @state()
    private _errorDocumentId?: string;


    async firstUpdated() {
        this.#unique = this.data?.unique;
        await this.#getDocumentName();
    }

    async #getDocumentName() {
        if (!this.#unique) return;
        // Should this be done here or in the action file?
        const {data} = await new UmbDocumentItemRepository(this).requestItems([this.#unique]);
        if (!data) return;
        const item = data[0];
        this._documentName = item.variants[0]?.name;

        if (item.isProtected) {
            await this.#getPublicAccessModel();
        }
    }

    async #getPublicAccessModel() {
        if (!this.#unique) return;
        const {data} = await this.#repo.read(this.#unique);

        if (!data) return;
        this.#isNew = false;
        this._startPage = false;

        // Specific or Groups
        this._specific = data.members.length > 0;

        //selection
        if (data.members.length > 0) {
            this._selection = data.members.map((m) => m.id);
        } else if (data.groups.length > 0) {
            this._selection = data.groups.map((g) => g.id);
        }

        this._loginDocumentId = data.loginDocument.id;
        this._errorDocumentId = data.errorDocument.id;
    }

    #handleNext() {
        this._startPage = false;
    }


    async #handleSave() {
        if (!this._loginDocumentId || !this._errorDocumentId || !this.#unique) return;

        // TODO: [v15] Currently the Management API doesn't support passing the member/group ids, only the userNames/names.
        // This is a temporary solution where we have to look them up until the API is updated to support this.
        const requestBody: PublicAccessRequestModel = {
            memberGroupNames: [],
            memberUserNames: [],
            loginDocument: {id: this._loginDocumentId},
            errorDocument: {id: this._errorDocumentId},
        };

        if (this._specific) {
            const repo = new UmbMemberDetailRepository(this);
            const promises = this._selection.map((memberId) => repo.requestByUnique(memberId));
            const responses = await Promise.all(promises);
            requestBody.memberUserNames = responses
                .filter((response) => response.data)
                .map((response) => response.data?.username) as string[];
        } else {
            // Groups
            const repo = new UmbMemberGroupItemRepository(this);
            const {data} = await repo.requestItems(this._selection);
            if (!data) throw new Error('No Member groups returned');

            requestBody.memberGroupNames = data
                .filter((groupItem) => this._selection.includes(groupItem.unique))
                .map((groupItem) => groupItem.name);
        }

        if (this.#isNew) {
            await this.#repo.create(this.#unique, requestBody);
        } else {
            await this.#repo.update(this.#unique, requestBody);
        }

        this.modalContext?.submit();
    }

    async #handleDelete() {
        if (!this.#unique) return;
        await this.#repo.delete(this.#unique);
        this.modalContext?.submit();
    }

    #handleCancel() {
        this.modalContext?.reject();
    }

    // Change Events

    #onChangeLoginPage(e: CustomEvent) {
        this._loginDocumentId = (e.target as UmbInputDocumentElement).selection[0];
    }

    #onChangeErrorPage(e: CustomEvent) {
        this._errorDocumentId = (e.target as UmbInputDocumentElement).selection[0];
    }

    #onChangeGroup(e: CustomEvent) {
        this._selection = (e.target as UmbInputMemberGroupElement).selection;
    }

    #onChangeMember(e: CustomEvent) {
        this._selection = (e.target as UmbInputMemberElement).selection;
    }

    override render() {
        console.log("asd")
        return html`
            <umb-body-layout headline=${this.localize.term('actions_protect')}>
                <uui-box>${this._startPage ? this.renderSelectGroup() : this.renderEditPage()}</uui-box>
                ${this.renderActions()}
            </umb-body-layout>
        `;
    }

    renderSelectGroup() {
        return html`
            <umb-localize key="publicAccess_paHowWould" .args=${[this._documentName]}>
                Choose how you want to restrict public access to the page '${this._documentName}'.
            </umb-localize>
            <uui-radio-group
                    @change=${(e: UUIRadioEvent) =>
                            e.target.value === 'members' ? (this._specific = true) : (this._specific = false)}>
                <uui-radio label=${this.localize.term('publicAccess_paMembers')} value="members">
                    <strong>${this.localize.term('publicAccess_paMembers')}</strong><br/>
                    ${this.localize.term('publicAccess_paMembersHelp')}
                </uui-radio>
                <uui-radio label=${this.localize.term('publicAccess_paGroups')} value="groups">
                    <strong>${this.localize.term('publicAccess_paGroups')}</strong><br/>
                    ${this.localize.term('publicAccess_paGroupsHelp')}
                </uui-radio>
            </uui-radio-group>`;
    }

    // Second page when editing Restricting Public Access
    renderEditPage() {
        return html`${this.renderMemberType()}
        <p>
            <umb-localize key="publicAccess_paSelectPages">
                Select the pages that contain login form and error messages
            </umb-localize>
        </p>
        <div class="select-item">
            <strong>
                <umb-localize key="publicAccess_paLoginPage">Login Page</umb-localize>
            </strong>
            <small>
                <umb-localize key="publicAccess_paLoginPageHelp"> Choose the page that contains the login form
                </umb-localize>
            </small>
            <umb-input-document
                    .value=${this._loginDocumentId}
                    max="1"
                    @change=${this.#onChangeLoginPage}></umb-input-document>
        </div>
        <br/>
        <div class="select-item">
            <strong>
                <umb-localize key="publicAccess_paErrorPage">Error Page</umb-localize>
            </strong>
            <small>
                <umb-localize key="publicAccess_paErrorPageHelp">
                    Used when people are logged on, but do not have access
                </umb-localize>
            </small>
            <umb-input-document
                    .value=${this._errorDocumentId}
                    max="1"
                    @change=${this.#onChangeErrorPage}></umb-input-document>
        </div>`;
    }

    renderMemberType() {
        return this._specific
            ? html`
                    <umb-localize key="publicAccess_paSelectMembers" .args=${[this._documentName]}>
                        Select the members who have access to the page <strong>${this._documentName}</strong>
                    </umb-localize>
                    <umb-input-member .selection=${this._selection} @change=${this.#onChangeMember}></umb-input-member>`
            : html`
                    <umb-localize key="publicAccess_paSelectGroups" .args=${[this._documentName]}>
                        Select the groups who have access to the page <strong>${this._documentName}</strong>
                    </umb-localize>
                    <umb-input-member-group
                            .selection=${this._selection}
                            @change=${this.#onChangeGroup}></umb-input-member-group>`;
    }

    // Action buttons
    renderActions() {
        // Check for Save or Next button
        const confirm = !this._startPage
            ? html`
                    <uui-button
                            slot="actions"
                            id="save"
                            look="primary"
                            color="positive"
                            label=${this.localize.term('buttons_save')}
                            ?disabled=${!this._loginDocumentId || !this._errorDocumentId || this._selection.length === 0}
                            @click="${this.#handleSave}"></uui-button>`
            : html`
                    <uui-button
                            slot="actions"
                            id="save"
                            look="primary"
                            label=${this.localize.term('general_next')}
                            ?disabled=${this._specific === undefined}
                            @click="${this.#handleNext}"></uui-button>`;
        // Check for Remove button
        const remove = !this.#isNew
            ? html`
                    <uui-button
                            slot="actions"
                            id="save"
                            look="primary"
                            color="warning"
                            @click="${this.#handleDelete}"
                            label=${this.localize.term('publicAccess_paRemoveProtection')}></uui-button>`
            : nothing;
        //Render the buttons
        return html`
            <uui-button
                    slot="actions"
                    id="cancel"
                    label=${this.localize.term('buttons_confirmActionCancel')}
                    @click="${this.#handleCancel}"></uui-button
            >${remove}${confirm}`;
    }

    static override styles = [
        UmbTextStyles,
        css`
            uui-box,
            uui-radio-group {
                display: flex;
                flex-direction: column;
                gap: var(--uui-size-4);
            }

            uui-radio-group {
                margin-top: var(--uui-size-4);
            }

            p {
                margin: var(--uui-size-6) 0 var(--uui-size-2);
            }

            small {
                display: block;
            }
        `,
    ];
}

export default DefaultAccessModal;

declare global {
    interface HTMLElementTagNameMap {
        'umb-default-access-modal': DefaultAccessModal;
    }
}